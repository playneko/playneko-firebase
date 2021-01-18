import React, { useEffect } from 'react';
import { useHistory } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import Avatar from '@material-ui/core/Avatar';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import firebase from "firebase";

// 컴포넌트
// 로그인 체크
import CheckLogin from "./CheckLogin";
// Header
import Header from "./ChatHeader";
// Footer
import Footer from "./Footer";

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
}));

const ChatRooms = (uid, setChatRooms) => {
  let db = firebase.database();
  let ref = db.ref("/chatrooms/" + uid);

  useEffect(() => {
    ref
      .orderByKey()
      .on("value", snapshot => {
        setChatRooms({
          data: snapshot.val()
        });
      });
  }, [uid]);
}

const ChatData = (chatid, setChatData) => {
  let db = firebase.database();
  let ref = db.ref("/message/" + chatid);

  useEffect(() => {
    ref
    .limitToLast(1)
    .on("value", snapshot => {
      setChatData({
        data: snapshot.val()
      });
    });
  }, []);
}

const RoomRender = (paramData) => {
  const history = paramData.history;
  const idx = paramData.idx;
  const item = paramData.item;
  const [chatdata, setChatData] = React.useState(null);
  let roomdata = {};

  const handleOnChatRoom = (history, chatid) => {
    history.push("/chat/room/" + chatid);
  };

  // 채팅내역 취득
  if (item != null) {
    ChatData(item.chatid, setChatData);

    // 채팅글 가져오기
    if (chatdata != null && chatdata.data != null) {
      Object.keys(chatdata.data).map(item => (
        roomdata = chatdata.data[item]
      ));
    }
  }

  return (
    <ListItem key={idx} button onClick={() => handleOnChatRoom(history, item.chatid)}>
      <ListItemAvatar>
        <Avatar
          alt={item.name}
          src={item.image}
        />
      </ListItemAvatar>
      <div>
        <ListItemText id={idx} primary={item.name} />
        <div className="chat-list_data">
          <nobr>{roomdata != null ? roomdata.message : ""}</nobr>
        </div>
      </div>
      <ListItemSecondaryAction>
        <span className="chat-list_date">{roomdata != null && roomdata.datetime != null ? roomdata.datetime.split(" ")[0].substring(2).replaceAll("-", "/") : ""}</span>
      </ListItemSecondaryAction>
    </ListItem>
  );
}

const ListRender = (paramData) => {
  const history = paramData.children.history;
  const lists = paramData.children.rooms.data;

  if (lists != null) {
    return (
      <>
      {
        Object.keys(lists).map((item, idx) => (
          <RoomRender history={history} idx={idx} item={lists[item]} />
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

const ChatList = (props) => {
  const history = useHistory();
  const classes = useStyles();
  const [chatrooms, setChatRooms] = React.useState(null);

  const paramData = {
    history: history,
    rooms: chatrooms
  };

  // 로그인 체크
  CheckLogin(props);

  // 채팅목록 취득
  ChatRooms(props.children.uid, setChatRooms);

  return (
    <>
      <Header />
      <List dense className={classes.root + " list-top"}>
      {chatrooms != null ? <ListRender>{paramData}</ListRender> : ""}
      </List>
      <Footer />
    </>
  );
}

export default ChatList;