import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import TextField from '@material-ui/core/TextField';
import AccountCircle from '@material-ui/icons/AccountCircle';
import InputAdornment from '@material-ui/core/InputAdornment';

// 컴포넌트
// 로그인 체크
import CheckLogin from "./CheckLogin";
// Header
import Header from "./PeopleHeader";

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
}));

const PeopleAdd = (props) => {
  const classes = useStyles();

  // 로그인 체크
  CheckLogin(props);

  return (
    <>
      <Header>add</Header>
      <div className="people-add_div">
        <TextField
          className={classes.margin}
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
      </div>
      <List dense className={classes.root}>
      </List>
    </>
  );
};

export default PeopleAdd;