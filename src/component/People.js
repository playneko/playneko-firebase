import React, { useEffect } from 'react';
import moment from 'moment';
import { useHistory } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import Avatar from '@material-ui/core/Avatar';
import ListItem from '@material-ui/core/ListItem';
import IconButton from '@material-ui/core/IconButton';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ArrowForwardIos from '@material-ui/icons/ArrowForwardIos';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import firebase from "firebase";

// 컴포넌트
// 유니크키 생성
import ChildByAutoId from "./ChildByAutoId";
// 로그인 체크
import CheckLogin from "./CheckLogin";
// Header
import Header from "./PeopleHeader";
// Footer
import Footer from "./Footer";

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
}));

const GetChatRoomData = (muid, uuid, setChatid, setGotoFlg) => {
  let db = firebase.database();
  let ref = db.ref("/chatrooms").child(muid).child(uuid);

  ref
  .on("value", snapshot => {
    setGotoFlg(true);
    setChatid({
      data: snapshot.val() != null ? snapshot.val().chatid : null
    });
  });
}

const AddChatRoomData = (handleRoom) => {
  let db = firebase.database();
  const nowTime = moment().format('YYYY-MM-DD HH:mm:ss');
  const childByAutoId = ChildByAutoId("chatrooms", handleRoom.myData.uid);

  // 나의 채팅방 개설
  const myRoomData = {
    chatid: childByAutoId,
    uuid: handleRoom.myData.uid,
    name: handleRoom.myData.name,
    image: handleRoom.myData.image,
    datetime : nowTime
  };

  // 상대편에게도 채팅방 개설
  const userRoomData = {
    chatid: childByAutoId,
    uuid: handleRoom.userData.uuid,
    name: handleRoom.userData.name,
    image: handleRoom.userData.image,
    datetime : nowTime
  };

  // 나와 상대편의 채팅방 개설
  db.ref('chatrooms').child(myRoomData.uuid).child(userRoomData.uuid).update(myRoomData);
  // 상대편과 나의 채팅방 개설
  db.ref('chatrooms').child(userRoomData.uuid).child(myRoomData.uuid).update(userRoomData);

  return childByAutoId;
}

const Friends = (uid, setFriends) => {
  let db = firebase.database();
  let ref = db.ref("/friends").child(uid);

  useEffect(() => {
    ref
    .orderByKey()
    .on("value", snapshot => {
      setFriends({
        data: snapshot.val()
      });
    });
  }, [uid]);
}

const ChatRoom = (history, chatid, setChatid, handleRoom, setHandleRoom, gotoFlg, setGotoFlg) => {
  useEffect(() => {
    if (handleRoom != null) {
      GetChatRoomData(handleRoom.myData.uid, handleRoom.userData.uuid, setChatid, setGotoFlg);
    }
  }, [handleRoom]);

  useEffect(() => {
    let chatRoomId = null;
    if (chatid != null && chatid.data != null) {
      chatRoomId = chatid.data;
    }

    if (gotoFlg && (chatid == null || chatid.data == null) && handleRoom != null) {
      // 채팅방 추가
      chatRoomId = AddChatRoomData(handleRoom);
    }

    if (gotoFlg && chatRoomId != null) {
      // 채팅방 이동
      setChatid(null);
      setGotoFlg(false);
      setHandleRoom(null);
      history.push("/chat/room/" + chatRoomId);
    }
  }, [chatid]);
}

const ListRender = (paramData) => {
  const param = paramData.children;
  const auth = param.auth;
  const lists = param.friends.data;
  const setHandleRoom = param.setHandleRoom;

  const handleOnChatRoom = (myData, userData) => {
    setHandleRoom({
      myData: myData,
      userData: userData
    });
  };

  if (lists != null) {
    return (
      <>
      {
        Object.keys(lists).map((item, idx) => (
          <ListItem key={idx} button>
            <ListItemAvatar>
              <Avatar
                alt={lists[item].name}
                src={lists[item].image}
              />
            </ListItemAvatar>
            <ListItemText id={idx} primary={lists[item].name} />
            <ListItemSecondaryAction>
              <IconButton edge="end" aria-label="comments" onClick={() => handleOnChatRoom(auth, lists[item])}>
                <ArrowForwardIos />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        ))
      }
      </>
    );
  } else {
    return (
      <></>
    );
  }
}

const People = (props) => {
  const classes = useStyles();
  const history = useHistory();
  const [chatid, setChatid] = React.useState(null);
  const [gotoFlg, setGotoFlg] = React.useState(false);
  const [friends, setFriends] = React.useState(null);
  const [handleRoom, setHandleRoom] = React.useState(null);

  const paramData = {
    auth: props.children,
    history: history,
    friends: friends,
    setHandleRoom: setHandleRoom
  };

  // 로그인 체크
  CheckLogin(props);

  // 친구목록 취득
  Friends(props.children.uid, setFriends);

  // 채팅방
  ChatRoom(history, chatid, setChatid, handleRoom, setHandleRoom, gotoFlg, setGotoFlg);

  return (
    <>
      <Header />
      <List dense className={classes.root + " list-top"}>
      {friends != null ? <ListRender>{paramData}</ListRender> : ""}
      </List>
      <Footer />
    </>
  );
}

export default People;