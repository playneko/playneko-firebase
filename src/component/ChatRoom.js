import React, { useEffect } from 'react';
import { useParams } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import Avatar from '@material-ui/core/Avatar';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import firebase from "firebase";

// 컴포넌트
// 로그인 체크
import CheckLogin from "./CheckLogin";
// Header
import Header from "./ChatHeader";
// Footer
import Footer from "./ChatFooter";

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
}));

const ChatRooms = (message, chatid, setChatRooms) => {
  let db = firebase.database();
  let ref = db.ref("/message/" + chatid);

  useEffect(() => {
    ref
      .limitToLast(15)
      .on("value", snapshot => {
        setChatRooms({
          data: snapshot.val()
        });
      });
  }, [message]);
}

const ListRender = (paramData) => {
  const auth = paramData.children.auth;
  const lists = paramData.children.rooms.data;

  if (lists != null) {
    return (
      <>
      {
        Object.keys(lists).map((item, idx) => (
          lists[item].uuid === auth.uid ?
            <ListItem key={idx} button>
              <ListItemAvatar className="chat-room_bubble_avatar">
                <Avatar
                  alt={lists[item].name}
                  src={lists[item].image}
                />
              </ListItemAvatar>
              <div className="chat-room_bubble_left">{lists[item].message}</div>
              <div className="chat-room_bubble_time_left">{lists[item].datetime != null ? lists[item].datetime.split(" ")[1].substring(0,5) : ""}</div>
            </ListItem>
          :
            <ListItem key={idx} button>
              <div className="chat-room_bubble_time_right">{lists[item].datetime != null ? lists[item].datetime.split(" ")[1].substring(0,5) : ""}</div>
              <div className="chat-room_bubble_right">{lists[item].message}</div>
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

const ChatRoom = (props) => {
  const classes = useStyles();
  const { chatid } = useParams();
  const [message, setMessage] = React.useState(null);
  const [chatrooms, setChatRooms] = React.useState(null);

  const paramData = {
    chatid: chatid,
    auth: props.children,
    rooms: chatrooms
  };

  // 로그인 체크
  CheckLogin(props);

  // 채팅목록 취득
  ChatRooms(message, chatid, setChatRooms);

  console.log(message);

  return (
    <>
      <Header>room</Header>
      <List dense className={classes.root + " list-top list-bottom"}>
      {chatid != null && chatrooms != null ? <ListRender>{paramData}</ListRender> : ""}
      </List>
      <Footer chatid={chatid} params={setMessage} />
    </>
  );
}

export default ChatRoom;