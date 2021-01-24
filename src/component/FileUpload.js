import React, { useEffect } from 'react';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import MuiAlert from '@material-ui/lab/Alert';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import firebase from "firebase";

const UpdateData = (ref, key1, key2, data, image) => {
    // 이미지 데이터 정보 갱신
    const newImageInfo = {...data, image: image};
    ref.child(key1).child(key2).update(newImageInfo);
}

const FindDataUpdateUsers = (uid, image) => {
    let db = firebase.database();
    let ref = db.ref("/users");

    ref.orderByChild("uuid").equalTo(uid).once("value", snapshot => {
        // 이미지 데이터 정보 갱신
        const newImageInfo = {...snapshot.val(), image: image};
        ref.child(uid).update(newImageInfo);
    });
}

const FindDataUpdateChatRooms = (uid, image, setChatRooms) => {
    let db = firebase.database();
    let ref = db.ref("/chatrooms");

    ref.once("value", snapshot => {
        const listVal = snapshot.val();
        setChatRooms({data: listVal});
        Object.keys(listVal).map((item, idx) => (
            Object.keys(listVal[item]).map((item2, idx2) => (
                // 이미지 데이터 정보 갱신
                item2 === uid ? UpdateData(ref, item, item2, listVal[item][item2], image) : ""
            ))
        ));
    });
}

const FindDataUpdateFriends = (uid, image) => {
    let db = firebase.database();
    let ref = db.ref("/friends");

    ref.once("value", snapshot => {
        const listVal = snapshot.val();
        Object.keys(listVal).map((item, idx) => (
            Object.keys(listVal[item]).map((item2, idx2) => (
                // 이미지 데이터 정보 갱신
                listVal[item][item2].uuid === uid ? UpdateData(ref, item, item2, listVal[item][item2], image) : ""
            ))
        ));
    });
}

const FindDataUpdateMessage = (uid, image, chatrooms) => {
    let db = firebase.database();
    let ref = db.ref("/message");
    const lists = chatrooms.data;

    Object.keys(lists).map((item, idx) => (
        Object.keys(lists[item]).map((item2, idx2) => (
            ref.child(lists[item][item2].chatid).once("value", snapshot => {
                const chatid = lists[item][item2].chatid;
                const listVal = snapshot.val();
                Object.keys(listVal).map((item3, idx3) => (
                    ref.child(chatid).child(item3).once("value", snapshot2 => {
                        const listVal2 = snapshot2.val();
                        if (listVal2.uuid === uid) {
                            // 이미지 데이터 정보 갱신
                            UpdateData(ref, chatid, item3, listVal2, image)
                        }
                    })
                ));
            })
        ))
    ));
}

const CircularProgressWithLabel = (props) => {
    return (
        <Box position="relative" display="inline-flex">
            <CircularProgress variant="determinate" {...props} />
            <Box
                top={0}
                left={0}
                bottom={0}
                right={0}
                position="absolute"
                display="flex"
                alignItems="center"
                justifyContent="center"
            >
                <Typography variant="caption" component="div" color="textSecondary">{`${Math.round(props.value,)}%`}</Typography>
            </Box>
        </Box>
    );
};

const Alert = (props) => {
    return <MuiAlert elevation={6} variant="filled" {...props} className="other-upload_error" />;
}

const FileUpload = (props) => {
    const auth = props.auth;
    const setAuthInfo = props.setAuthInfo;
    const hiddenFileInput = React.useRef(null);
    const [chatrooms, setChatRooms] = React.useState({});
    const [error, setError] = React.useState(false);
    const [loading, setLoading] = React.useState(false);
    const [uploadFlg, setUploadFlg] = React.useState(false);
    const [progress, setProgress] = React.useState(0);
    const [fileUpload, setFileUpload] = React.useState({
        files: []
    });

    const handleOnFileUpload = (file) => {
        // FileReader 객체 생성
        const reader = new FileReader();

        setLoading(true);
        reader.onloadend = (e) => {
            // blob변수에 전달된 파라미터의 배열과 업로드할 파일 타입을 담은 객체를 저장
            const blob = new Blob([e.target.result], { type: "image/jpeg" });

            // 업로드할 파일을 저장할 스토리지의 url -> 파이어베이스 스토리지의 '폴더+파일이름' 으로 구성
            const storageUrl = 'images/' + file.name;

            // 스토리지 참조값 생성
            const storageRef = firebase.storage().ref(storageUrl);

            // blob(업로드할 파일 데이터가 담긴)을 업로드(put)하고 진행률에 따른 변화를 감지하기위해 변수에 저장
            const uploadTask = storageRef.put(blob);

            // 업로드시 진행률에 따른 변화를 감지하기위한 이벤트
            uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, (snapshot) => {
                // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                setProgress(progress);

                switch (snapshot.state) {
                    case firebase.storage.TaskState.PAUSED: // or 'paused'
                        break;
                    case firebase.storage.TaskState.RUNNING: // or 'running'
                        break;
                }
            }, (error) => {
                setError(true);
                setLoading(false);
            }, () => {
                // 로드가 성공적으로 완료되면 이때부터 다운로드 url을 가져올수 있음
                uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
                    // console.log('File available at', downloadURL);
                    // state에 파일이름과 스토리지 url 저장
                    const obj = {
                        name: file.name,
                        storageUrl: 'images/' + file.name
                    };
                    setFileUpload({
                        files: fileUpload.files.concat(obj)
                    });
                    // 사용자 정보 갱신
                    const newAuthInfo = {...auth, image: downloadURL};
                    setAuthInfo(newAuthInfo);
                    setLoading(false);
                    setUploadFlg(true);
                });
            });
        }

        reader.onerror = (e) => {
            setError(true);
            setLoading(false);
        };
        reader.readAsArrayBuffer(file);
    }

    const handleClick = (e) => {
        if (!error && !loading && progress < 1) {
            hiddenFileInput.current.click();
        }
    };

    const handleChange = (e) => {
        e.preventDefault();
        const fileUploaded = e.target.files[0];
        handleOnFileUpload(fileUploaded);
    };

    useEffect(() => {
        if (uploadFlg && auth.uid && auth.uid != null) {
            // 사용자 갱신
            FindDataUpdateUsers(auth.uid, auth.image);
            // 채팅방 갱신
            FindDataUpdateChatRooms(auth.uid, auth.image, setChatRooms);
            // 친구목록 갱신
            FindDataUpdateFriends(auth.uid, auth.image);
        }
    }, [uploadFlg]);

    // 메세지 갱신
    useEffect(() => {
        if (uploadFlg && chatrooms && chatrooms != null) {
            FindDataUpdateMessage(auth.uid, auth.image, chatrooms);
        }
    }, [chatrooms]);

    return (
        <div>
            <form onClick={handleClick} className="other-progress">
            {
                error ?
                    <Alert severity="error">メールまたは、パスワードを確認して下さい。</Alert>
                : ""
            }
            {
                !error && loading ?
                    <CircularProgressWithLabel value={progress} color="info" />
                : ""
            }
            {
                !error && !loading && !uploadFlg ?
                    <Button variant="contained" color="info" type="button">
                        写真選択
                    </Button>
                : ""
            }
            {
                !error && !loading && uploadFlg ?
                    <div className="other-upload_success">
                        アップロードが完了しました。
                    </div>
                : ""
            }
            <input
                type="file"
                ref={hiddenFileInput}
                onChange={handleChange}
                style={{display: 'none'}}
            />
            </form>
        </div>
    );
}

export default FileUpload;