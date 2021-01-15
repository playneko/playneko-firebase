import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import PersonAdd from '@material-ui/icons/PersonAdd';

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

const Header = () => {
  const classes = useStyles();

  return (
    <div className={classes.root + " header"}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            친구목록
          </Typography>
          <div>
            <IconButton
              aria-label="친구추가"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              color="inherit"
            >
              <PersonAdd />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default Header;