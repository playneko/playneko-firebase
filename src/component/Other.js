import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import Avatar from '@material-ui/core/Avatar';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';

// 컴포넌트
// 로그인 체크
import CheckLogin from "./CheckLogin";
// Header
import Header from "./OtherHeader";
// Footer
import Footer from "./Footer";
// CSS
import '../styles/App.css';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
}));

const Other = (props) => {
  const classes = useStyles();
  const auth = props.children;

  // 로그인 체크
  CheckLogin(props);

  return (
    <>
      <Header />
      <List dense className={classes.root + " list-top"}>
        <ListItemAvatar className="other-avatar">
          <Avatar
            alt={auth.name}
            src={auth.image}
          />
        </ListItemAvatar>
        <div className="other-name">
          <p>{auth.name}</p>
        </div>
      </List>
      <Footer />
    </>
  );
}

export default Other;