import React from 'react';
import { useHistory } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import ArrowBackIos from '@material-ui/icons/ArrowBackIos';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

const Header = (props) => {
  let history = useHistory();
  const classes = useStyles();
  const page = props.children;

  // 이전 페이지로 이동
  const handleOnBack = () => {
    history.push("/chat/list");
  };

  // 채팅 헤더
  const ChatList = () => {
    return (
      <>
        <Typography variant="h6" className={classes.title}>
          トーク
        </Typography>
      </>
    );
  }

  // 채팅방 헤더
  const ChatRoom = () => {
    return (
      <>
        <div className="header-people_back">
          <IconButton edge="end" aria-label="comments" color="inherit" onClick={handleOnBack}>
            <ArrowBackIos />
          </IconButton>
        </div>
        <Typography variant="h6" className={classes.title}>
          トーク
        </Typography>
      </>
    );
  }

  return (
    <div className={classes.root + " header"}>
      <AppBar position="static">
        <Toolbar>
        {
          page === "room" ?
            <ChatRoom />
          :
            <ChatList />
        }
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default Header;