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

const Friends = (uid, friends, setFriends) => {
  let db = firebase.database();
  let ref = db.ref("/friends/" + uid);

  useEffect(() => {
    ref
      .orderByKey()
      .on("value", snapshot => {
        if (!JSON.parse(JSON.stringify(snapshot)).uuid) {
          setFriends({
            data: snapshot.val()
          });
        } else {
          setFriends({
            data: [{
              name: JSON.parse(JSON.stringify(snapshot)).name,
              image: JSON.parse(JSON.stringify(snapshot)).image,
              uuid: JSON.parse(JSON.stringify(snapshot)).uuid
            }]
          });
        }
      });
  }, [uid]);
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
}));

const ItemRender = (param) => {
  const data = param.item.length > 0 ? param.item[0] : param.item;

  return (
    <ListItem key={param.idx} button>
      <ListItemAvatar>
        <Avatar
          alt={data.name}
          src={data.image}
        />
      </ListItemAvatar>
      <ListItemText id={param.idx} primary={data.name} />
      <ListItemSecondaryAction>
        <IconButton edge="end" aria-label="comments">
          <ArrowForwardIos />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  );
}

const ListRender = (friends) => {
  const lists = friends.children.data;

  if (lists != null) {
    if (lists.length < 2) {
      return (
        <>
        {<ItemRender idx="0" item={lists} />}
        </>
      );
    } else {
      return (
        <>
        {
          Object.keys(lists).map((item, idx) => (
            <ItemRender idx={idx} item={lists[item]} />
          ))
        }
        </>
      );
    }
  } else {
    return (
      <></>
    );
  }
}

const People = (props) => {
  const classes = useStyles();
  const [friends, setFriends] = React.useState(null);

  // 로그인 체크
  CheckLogin(props);

  // 친구목록 취득
  Friends(props.children.uid, friends, setFriends);

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