import React from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import PersonIcon from '@material-ui/icons/Person';
import ChatBubbleIcon from '@material-ui/icons/ChatBubble';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
    maxWidth: 500,
  },
});

const Footer = () => {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Paper square className={classes.root + " footer"}>
      <Tabs
        value={value}
        onChange={handleChange}
        variant="fullWidth"
        indicatorColor="tabbar"
        textColor="tabbar"
      >
        <Tab icon={<PersonIcon />} aria-label="친구목록" component={Link} to="/" />
        <Tab icon={<ChatBubbleIcon />} aria-label="채팅" component={Link} to="/" />
        <Tab icon={<MoreHorizIcon />} aria-label="기타" component={Link} to="/" />
      </Tabs>
    </Paper>
  );
}

export default Footer;