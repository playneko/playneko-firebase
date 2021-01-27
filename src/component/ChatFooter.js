import React from 'react';
import moment from 'moment';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import DirectionsIcon from '@material-ui/icons/Directions';
import EmojiEmotionsRounded from '@material-ui/icons/EmojiEmotionsRounded';
import firebase from "firebase";

// 컴포넌트
// 유니크키 생성
import ChildByAutoId from "./ChildByAutoId";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    width: 'calc(100vw - 1vw)',
    height: '40px',
    margin: '0 auto',
    marginTop: '2px',
    borderBottom: '0px',
    backgroundColor: '#545454',
  },
  input: {
    marginLeft: theme.spacing(1),
    backgroundColor: '#545454',
    width: 'calc(100vw)',
    height: '35px',
    border: '0px',
    flex: 1,
  },
  iconButton: {
    padding: 10,
    color: '#cccccc',
  },
  divider: {
    height: 28,
    margin: 4,
  },
}));

const SendProcessMessage = (childByAutoId, chatid, paramData) => {
  let db = firebase.database();
  let ref = db.ref("/message").child(chatid).child(childByAutoId);
  ref.set(paramData);
}

const SendMessage = (sendMessage) => {
  const nowTime = moment().format('YYYY-MM-DD HH:mm:ss');
  const chatid = sendMessage.chatid;
  const auth = sendMessage.auth;
  const emoji = sendMessage.emoji;
  const message = sendMessage.message;

  if (chatid != null && emoji != null && emoji.length > 0) {
    const paramData = {
      uuid: auth.uid,
      name: auth.name,
      image: auth.image,
      emoji: emoji,
      datetime : nowTime
    };
    const childByAutoId = ChildByAutoId("message", chatid);
    SendProcessMessage(childByAutoId, chatid, paramData);
  }
  if (chatid != null && message != null && message.length > 0) {
    const paramData = {
      uuid: auth.uid,
      name: auth.name,
      image: auth.image,
      message: message,
      datetime : nowTime
    };
    const childByAutoId = ChildByAutoId("message", chatid);
    SendProcessMessage(childByAutoId, chatid, paramData);
  }
}

const Footer = (props) => {
  const classes = useStyles();
  const emojiArr = ['001','002','003','004','005',
  '006','007','008','009','010','011','012','013',
  '014','015','016','017','018','019','020'];
  const [open, setOpen] = React.useState(false);
  const [selEmoji, setSelEmoji] = React.useState(null);

  const handleOnEmoji = () => {
    open ? setOpen(false) : setOpen(true);
    open ? setSelEmoji(null) : setSelEmoji(selEmoji);
  }

  const handleOnSelEmoji = (item) => {
    setSelEmoji(item);
  }

  const handleOffEmoji = () => {
    setOpen(false);
    setSelEmoji(null);
  }

  const handleOnSubmit = (event) => {
    event.preventDefault();
    const targetMessage = event.target.chat_message.value;
    const sendMessage = {
      emoji: selEmoji,
      message: targetMessage,
      auth: props.paramData.auth,
      chatid: props.paramData.chatid
    };

    props.paramMsg(sendMessage);
    SendMessage(sendMessage);

    // 이모티콘 초기화
    handleOffEmoji();
    // 메세지 초기화
    event.target.chat_message.value = "";
  }

  return (
    <>
      <div className={open ? "footer-chat_room footer-chat_input_open" : "footer-chat_room"}>
          <div className={selEmoji != null ? "footer_chat_room_emoji_pv_open" : "footer_chat_room_emoji_pv_close"}>
            <img src={"/emoji/" + (selEmoji ? selEmoji : "001") + ".png"} />
          </div>
          <Paper component="form" className={classes.root + " footer-chat_fieldset"} onSubmit={handleOnSubmit}>
            <TextField
              id="outlined-multiline-static"
              multiline
              rows={1}
              type="text"
              name="chat_message"
              variant="outlined"
              className={classes.input}
              onClick={handleOffEmoji}
            />
            <IconButton color="primary" className={classes.iconButton} aria-label="emoji" onClick={handleOnEmoji}>
              <EmojiEmotionsRounded />
            </IconButton>
            <Divider className={classes.divider} orientation="vertical" />
            <IconButton color="primary" className={classes.iconButton} aria-label="directions" type="submit">
              <DirectionsIcon />
            </IconButton>
          </Paper>
          <div className={open ? "footer-chat_room_emoji footer-chat_emoji_open" : "footer-chat_room_emoji footer-chat_emoji_close"}>
          {
            emojiArr.map(item => (
              <div><img src={"/emoji/" + item + ".png"} onClick={() => handleOnSelEmoji(item)} onDoubleClick={() => handleOnSelEmoji(item)} /></div>
            ))
          }
          </div>
        </div>
    </>
  );
}

export default Footer;