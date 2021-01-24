import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import Avatar from '@material-ui/core/Avatar';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';

// 컴포넌트
// 파일 업로드
import FileUploader from "./FileUpload";
// 로그인 체크
import CheckLogin from "./CheckLogin";
// Header
import Header from "./OtherHeader";

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
}));

const Other = (props) => {
  const classes = useStyles();
  const auth = props.auth;
  const setAuthInfo = props.setAuthInfo;

  // 로그인 체크
  CheckLogin(auth);

  return (
    <>
      <Header>profile</Header>
      <List dense className={classes.root + " list-top"}>
        <ListItemAvatar className="other-avatar">
          <Avatar
            alt={auth.name}
            src={auth.image}
          />
        </ListItemAvatar>
          <div className="other-profile">
            프로필사진 변경
          </div>
          <FileUploader auth={auth} setAuthInfo={setAuthInfo} />
        <ListItem key="0" className="other-profile_list">
          <ListItemText id="0" primary="이름" />
          <ListItemText id="0" primary={auth.name} />
        </ListItem>
        <ListItem key="2" className="other-profile_list">
          <ListItemText id="2" primary="이메일" />
          <ListItemText id="2" primary={auth.email} />
        </ListItem>
      </List>
    </>
  );
}

export default Other;