import React from 'react';
import { useHistory } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import MuiAlert from '@material-ui/lab/Alert';
import TextField from '@material-ui/core/TextField';
import CircularProgress from '@material-ui/core/CircularProgress';

// 컴포넌트
// Firebase
import firebase from './Firebase'
// CSS
import '../styles/App.css';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  margin: {
    margin: theme.spacing(1),
  },
  withoutLabel: {
    marginTop: theme.spacing(3),
  },
  textField: {
    width: '25ch',
  },
}));

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const Registry = (props) => {
  let history = useHistory();
  const classes = useStyles();
  const [error, setError] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const handleOnSubmit = (event) => {
    event.preventDefault();
  }

  return (
    <>
      <div className="registry-form">
        <form onSubmit={handleOnSubmit} className="registry-form_group">
          {error ? <Alert severity="error">이메일 또는 비밀번호를 확인해 주시기바랍니다.</Alert> : ""}
          <TextField
            label="이메일"
            id="margin-normal"
            name="email"
            className={classes.textField}
            helperText="이메일을 입력해 주세요."
          />
          <TextField
            label="비밀번호"
            id="margin-normal"
            type="password"
            name="password"
            className={classes.textField}
            helperText="비밀번호를 입력해 주세요."
          />
          <div className={loading === null || loading === false ? "registry-form_show" : "registry-form_hidden"}>
            <Button variant="contained" color="primary" type="submit">
              등록하기
            </Button>
          </div>
          <div className={loading != null && loading === true ? "registry-form_show" : "registry-form_hidden"}>
            <CircularProgress disableShrink />
          </div>
        </form>
      </div>
    </>
  );
}

export default Registry;