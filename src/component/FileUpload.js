import React from 'react';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import MuiAlert from '@material-ui/lab/Alert';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import firebase from "firebase";

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

const FileUpload = () => {
    const hiddenFileInput = React.useRef(null);
    const [error, setError] = React.useState(false);
    const [loading, setLoading] = React.useState(false);
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
                        console.log('Upload is paused');
                        break;
                    case firebase.storage.TaskState.RUNNING: // or 'running'
                        console.log('Upload is running');
                        break;
                }
            }, (error) => {
                setError(true);
                setLoading(false);
            }, () => {
                // 로드가 성공적으로 완료되면 이때부터 다운로드 url을 가져올수 있음
                uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
                    console.log('File available at', downloadURL);

                    // state에 파일이름과 스토리지 url 저장
                    const obj = {
                        name: file.name,
                        storageUrl: 'images/' + file.name
                    };
                    setFileUpload({
                        files: fileUpload.files.concat(obj)
                    });
                    setLoading(false);
                });
            });
        }

        reader.onerror = (e) => {
            console.log("Failed file read: " + e.toString());
            setError(true);
            setLoading(false);
        };
        reader.readAsArrayBuffer(file);
    }

    const handleClick = (e) => {
        hiddenFileInput.current.click();
    };

    const handleChange = (e) => {
        e.preventDefault();
        const fileUploaded = e.target.files[0];
        handleOnFileUpload(fileUploaded);
    };

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
                !error && !loading && progress < 1 ?
                    <Button variant="contained" color="info" type="button">
                        写真選択
                    </Button>
                : ""
            }
            {
                !error && !loading && progress === 100 ?
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