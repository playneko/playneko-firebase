import React, { useEffect } from 'react';
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
// 로그인 체크
import CheckLogin from "./CheckLogin";
// Header
import Header from "./PeopleHeader";
// Footer
import Footer from "./Footer";

const Friends = (uid, setfriends) => {
  let db = firebase.database();
  let ref = db.ref("/friends/" + uid);

  useEffect(() => {
    ref
      .orderByKey()
      .limitToFirst(10)
      .on("value", snapshot => {
        setfriends({
          data: snapshot.val()
        });
      });
  }, [uid]);
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
}));

const ListRender = (friends) => {
  const lists = friends.children.data;

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
              <IconButton edge="end" aria-label="comments">
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
  const [friends, setfriends] = React.useState(null);

  // 로그인 체크
  CheckLogin(props);

  // 친구목록 취득
  Friends(props.children.uid, setfriends);

  return (
    <>
      <Header />
      <List dense className={classes.root}>
      {friends != null ? <ListRender>{friends}</ListRender> : ""}
      </List>
      <Footer />
    </>
  );
}

export default People;