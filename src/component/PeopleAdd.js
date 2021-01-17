import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import Avatar from '@material-ui/core/Avatar';
import ListItem from '@material-ui/core/ListItem';
import TextField from '@material-ui/core/TextField';
import PersonAdd from '@material-ui/icons/PersonAdd';
import IconButton from '@material-ui/core/IconButton';
import ListItemText from '@material-ui/core/ListItemText';
import AccountCircle from '@material-ui/icons/AccountCircle';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import InputAdornment from '@material-ui/core/InputAdornment';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';

// 컴포넌트
// Firebase
import firebase from './Firebase'
// 로그인 체크
import CheckLogin from "./CheckLogin";
// Header
import Header from "./PeopleHeader";

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
}));

const ListRender = (paramData) => {
  const auth = paramData.children.auth;
  const search = paramData.children.search;
  const lists = paramData.children.friends.data;

  const handleOnPeopleAdd = (event, auth, item, data) => {
    console.log(event);
    console.log(auth);
    console.log(item);
    console.log(data);

    let db = firebase.database();
    let ref = db.ref("/friends/" + auth.uid);

    ref.set({
      uuid: item,
      name: data.name,
      image : data.image
    });
  };

  if (lists != null) {
    return (
      <>
      {
        Object.keys(lists).map((item, idx) => (
          lists[item].name === search ?
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
                  <PersonAdd onClick={(event) => handleOnPeopleAdd(event, auth, item, lists[item])} />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          : ""
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

const PeopleAdd = (props) => {
  const classes = useStyles();
  const [search, setSearch] = React.useState(null);
  const [friends, setFriends] = React.useState(null);

  // 로그인 체크
  CheckLogin(props);

  const handleOnSubmit = (event) => {
    event.preventDefault();
    setSearch(event.target.name.value);

    let db = firebase.database();
    let ref = db.ref("/users");
  
    ref
    .orderByKey()
    .on("value", snapshot => {
      setFriends({
        data: snapshot.val()
      });
    });
  }

  const paramData = {
    auth: props.children,
    search: search,
    friends: friends
  };

  return (
    <>
      <Header>add</Header>
      <div className="people-add_div">
        <form onSubmit={handleOnSubmit}>
        <TextField
          className={classes.margin}
          name="name"
          id="input-with-icon-textfield"
          label="아이디를 입력해 주세요."
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <AccountCircle />
              </InputAdornment>
            ),
          }}
        />
        </form>
      </div>
      <List dense className={classes.root}>
      {friends != null ? <ListRender>{paramData}</ListRender> : ""}
      </List>
    </>
  );
};

export default PeopleAdd;