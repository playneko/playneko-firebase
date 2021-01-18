import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import DirectionsIcon from '@material-ui/icons/Directions';
import EmojiEmotionsRounded from '@material-ui/icons/EmojiEmotionsRounded';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    width: 'calc(100vw - 1vw)',
    height: '40px',
    margin: '0 auto',
    marginTop: '2px',
    borderBottom: '0px',
    backgroundColor: '#545454',
    overflow: 'auto',
  },
  input: {
    marginLeft: theme.spacing(1),
    backgroundColor: '#545454',
    width: 'calc(100vw)',
    height: '35px',
    border: '0px',
    flex: 1,
  },
  iconButton: {
    padding: 10,
    color: '#cccccc',
  },
  divider: {
    height: 28,
    margin: 4,
  },
}));

const Footer = () => {
  const classes = useStyles();

  return (
    <>
      <div className="footer footer-chat_room">
        <Paper component="form" className={classes.root + " footer-chat_fieldset"}>
          {/* <TextField
            className={classes.input + " footer-chat_textarea"}
          /> */}
          <TextField
            id="outlined-multiline-static"
            multiline
            rows={1}
            variant="outlined"
            className={classes.input}
          />
          <IconButton color="primary" className={classes.iconButton} aria-label="emoji">
            <EmojiEmotionsRounded />
          </IconButton>
          <Divider className={classes.divider} orientation="vertical" />
          <IconButton color="primary" className={classes.iconButton} aria-label="directions">
            <DirectionsIcon />
          </IconButton>
        </Paper>
      </div>
    </>
  );
}

export default Footer;