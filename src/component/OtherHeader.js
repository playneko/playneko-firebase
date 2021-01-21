import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

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
  const classes = useStyles();

  return (
    <div className={classes.root + " header"}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            その他
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default Header;