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

    setLoading(true);
    firebase.auth().createUserWithEmailAndPassword(event.target.email.value, event.target.password.value)
    .then(res => {
      const user = firebase.auth().currentUser;
      
      if (user != null) {
        firebase.database().ref('users/' + user.uid).set({
          username: event.target.name.value,
          email: event.target.email.value,
          name: event.target.name.value,
          age: event.target.age.value,
          image : "https://firebasestorage.googleapis.com/v0/b/cocoatalk-41442.appspot.com/o/avata%2FkCvqARth.png?alt=media&token=23aedec4-4aa9-410a-84d1-7e7cb507c345"
        });
        setLoading(false);
        history.push("/");
      } else {
        setError(true);
        setLoading(false);
      }
    })
    .catch(error => {
      setError(true);
      setLoading(false);
    });
  }

  return (
    <>
      <div className="registry-form">
        <form onSubmit={handleOnSubmit} className="registry-form_group">
          {error ? <Alert severity="error">会員情報登録中エラーが発生しました。</Alert> : ""}
          <TextField
            label="メール"
            id="margin-normal"
            name="email"
            className={classes.textField}
            helperText="メールを入力して下さい。"
          />
          <TextField
            label="パスワード"
            id="margin-normal"
            type="password"
            name="password"
            className={classes.textField}
            helperText="パスワードを入力して下さい。"
          />
          <TextField
            label="お名前"
            id="margin-normal"
            name="name"
            className={classes.textField}
            helperText="お名前を入力して下さい。"
          />
          <TextField
            label="年齢"
            id="margin-normal"
            name="age"
            className={classes.textField}
            helperText="年齢を入力して下さい。"
          />
          <div className={loading === null || loading === false ? "registry-form_show" : "registry-form_hidden"}>
            <Button variant="contained" color="primary" type="submit">
              登録する
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