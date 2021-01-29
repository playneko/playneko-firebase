import React, { useEffect, useRef } from 'react';
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

const ScrollMoveBottom = (chatrooms, messagesRef) => {
  useEffect(() => {
    messagesRef.current.scrollIntoView({ behavior: 'auto', block: 'end' });
  }, [chatrooms]);
}

const ChatRooms = (message, chatid, setChatRooms) => {
  let db = firebase.database();
  let ref = db.ref("/message").child(chatid);

  useEffect(() => {
    ref
    .limitToLast(20)
    .on("value", snapshot => {
      setChatRooms({
        data: snapshot.val()
      });
    });
  }, [message]);
}

const EmojiRender = (item) => {
  return (
    <img src={"/emoji/" + item.emoji + ".png"} />
  );
}

const ListRender = (paramData) => {
  const auth = paramData.children.auth;
  const lists = paramData.children.rooms.data;

  if (lists != null) {
    return (
      <>
      {
        Object.keys(lists).map((item, idx) => (
          lists[item].uuid !== auth.uid ?
            <ListItem key={idx} button>
              <ListItemAvatar className="chat-room_bubble_avatar">
                <Avatar
                  alt={lists[item].name}
                  src={lists[item].image}
                />
              </ListItemAvatar>
              <div>
                <div className="chat-room_bubble_name_left">{lists[item].name}</div>
                <div className={lists[item].emoji != null ? "chat-room_emoji_left" : "chat-room_bubble_left"}>{lists[item].emoji != null ? <EmojiRender emoji={lists[item].emoji} /> : lists[item].message}</div>
              </div>
              <div className="chat-room_bubble_time_left">{lists[item].datetime != null ? lists[item].datetime.split(" ")[1].substring(0,5) : ""}</div>
            </ListItem>
          :
            <ListItem key={idx} button>
              <div className="chat-room_bubble_time_right">{lists[item].datetime != null ? lists[item].datetime.split(" ")[1].substring(0,5) : ""}</div>
              <div className={lists[item].emoji != null ? "chat-room_emoji_right" : "chat-room_bubble_right"}>{lists[item].emoji != null ? <EmojiRender emoji={lists[item].emoji} /> : lists[item].message}</div>
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
  const messagesRef = useRef();
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

  // 스크롤 하단으로 이동
  ScrollMoveBottom(chatrooms, messagesRef);

  return (
    <>
      <Header>room</Header>
      <List dense className={classes.root + " list-top list-bottom"} ref={messagesRef}>
      {chatid != null && chatrooms != null ? <ListRender>{paramData}</ListRender> : ""}
      </List>
      <Footer paramData={paramData} paramMsg={setMessage} />
    </>
  );
}

export default ChatRoom;