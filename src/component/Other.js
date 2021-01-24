import React from 'react';
import { useHistory } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import Avatar from '@material-ui/core/Avatar';
import ListItem from '@material-ui/core/ListItem';
import IconButton from '@material-ui/core/IconButton';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import InfoIcon from '@material-ui/icons/Info';
import HelpIcon from '@material-ui/icons/Help';
import PersonIcon from '@material-ui/icons/Person';
import ArrowForwardIos from '@material-ui/icons/ArrowForwardIos';
import RecordVoiceOverIcon from '@material-ui/icons/RecordVoiceOver';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';

// 컴포넌트
// 로그인 체크
import CheckLogin from "./CheckLogin";
// Header
import Header from "./OtherHeader";
// Footer
import Footer from "./Footer";

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
}));

const Other = (props) => {
  const classes = useStyles();
  const history = useHistory();
  const auth = props.children;
  const lists = [
    {name: "", icon: "", link: ""},
    {name: "プロフィール", icon: "Person", link: "profile"},
    // {name: "お知らせ", icon: "RecordVoiceOver", link: "notice"},
    // {name: "バージョン", icon: "Info", link: "version"},
    // {name: "ヘルプ", icon: "Help", link: "help"}
  ];

  const handleOnMenu = (link) => {
    if (link && link != null) {
      history.push("/other/" + link);
    }
  };

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
        {
          Object.keys(lists).map((item, idx) => (
            <ListItem key={idx} button onClick={() => handleOnMenu(lists[item].link)}>
              <ListItemIcon>
                {lists[item].icon === "Person" ? <PersonIcon /> : "" }
                {lists[item].icon === "RecordVoiceOver" ? <RecordVoiceOverIcon /> : "" }
                {lists[item].icon === "Info" ? <InfoIcon /> : "" }
                {lists[item].icon === "Help" ? <HelpIcon /> : "" }
              </ListItemIcon>
              <ListItemText id={idx} primary={lists[item].name} />
              {
                lists[item].name ?
                  <ListItemSecondaryAction>
                    <IconButton edge="end" aria-label="comments">
                      <ArrowForwardIos />
                    </IconButton>
                  </ListItemSecondaryAction>
                : ""
              }
            </ListItem>
          ))
        }
      </List>
      <Footer />
    </>
  );
}

export default Other;