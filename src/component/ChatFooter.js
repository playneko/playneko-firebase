import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import DirectionsIcon from '@material-ui/icons/Directions';
import EmojiEmotionsRounded from '@material-ui/icons/EmojiEmotionsRounded';
import firebase from "firebase";

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

const ChildByAutoId = (chatid) => {
  let db = firebase.database();
  const childByAutoId = db.ref('/message' + chatid).push();
  return childByAutoId.key;
}

const SendMessage = (sendMessage) => {
  let db = firebase.database();
  const childByAutoId = ChildByAutoId(sendMessage.chatid);

  console.log(sendMessage);
  console.log(childByAutoId);
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
    const message = event.target.chat_message.value;
    const sendMessage = {
      emoji: selEmoji,
      message: message,
      chatid: props.chatid
    };

    console.log(sendMessage);
    props.params(sendMessage);
    SendMessage(sendMessage);
  }

  return (
    <>
      <div className={open ? "footer-chat_room footer-chat_input_open" : "footer-chat_room"}>
          <div className={selEmoji != null ? "footer_chat_room_emoji_pv_open" : "footer_chat_room_emoji_pv_close"}>
            <img src={"http://10.0.1.5:3000/emoji/" + (selEmoji ? selEmoji : "001") + ".png"} />
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
              <div><img src={"http://10.0.1.5:3000/emoji/" + item + ".png"} onClick={() => handleOnSelEmoji(item)} /></div>
            ))
          }
          </div>
        </div>
    </>
  );
}

export default Footer;