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
    history.goBack();
  };

  const HeaderRender = () => {
    if (page === "profile") {
      return (
        <>
          <div className="header-people_back">
            <IconButton edge="end" aria-label="comments" color="inherit" onClick={handleOnBack}>
              <ArrowBackIos />
            </IconButton>
          </div>
          <Typography variant="h6" className={classes.title}>
            プロフィール
          </Typography>
        </>
      );
    } else if (page === "notice") {
      return (
        <>
          <div className="header-people_back">
            <IconButton edge="end" aria-label="comments" color="inherit" onClick={handleOnBack}>
              <ArrowBackIos />
            </IconButton>
          </div>
          <Typography variant="h6" className={classes.title}>
            お知らせ
          </Typography>
        </>
      );
    } else if (page === "version") {
      return (
        <>
          <div className="header-people_back">
            <IconButton edge="end" aria-label="comments" color="inherit" onClick={handleOnBack}>
              <ArrowBackIos />
            </IconButton>
          </div>
          <Typography variant="h6" className={classes.title}>
            バージョン
          </Typography>
        </>
      );
    } else if (page === "help") {
      return (
        <>
          <div className="header-people_back">
            <IconButton edge="end" aria-label="comments" color="inherit" onClick={handleOnBack}>
              <ArrowBackIos />
            </IconButton>
          </div>
          <Typography variant="h6" className={classes.title}>
            ヘルプ
          </Typography>
        </>
      );
    } else {
      return (
        <>
          <Typography variant="h6" className={classes.title}>
            その他
          </Typography>
        </>
      );
    }
  }

  return (
    <div className={classes.root + " header"}>
      <AppBar position="static">
        <Toolbar>
          <HeaderRender />
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default Header;