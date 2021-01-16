import React, { useEffect } from 'react';
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

const Friends = (uid, setfriends) => {
  let db = firebase.database();
  let ref = db.ref("/friends/" + uid);
  console.log(ref);

  useEffect(() => {
    ref
      .orderByKey()
      .limitToFirst(10)
      .on("value", snapshot => {
        console.log(snapshot);
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
  console.log(lists);
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
}

const People = (props) => {
  let history = useHistory();
  const classes = useStyles();
  const [friends, setfriends] = React.useState(null);

  Friends(props.children.uid, setfriends);
  console.log(props.children.uid);
  console.log(friends);

  return (
    <>
      <List dense className={classes.root}>
      {friends != null ? <ListRender>{friends}</ListRender> : ""}
      </List>
    </>
  );
}

export default People;