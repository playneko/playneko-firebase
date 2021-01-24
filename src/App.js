import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/styles';
import { createMuiTheme } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import firebase from "firebase";

// 컴포넌트
// 로그인
import Login from "./component/Login";
// 회원가입
import Registry from "./component/Registry";
// 친구목록
import People from "./component/People";
// 친구추가
import PeopleAdd from "./component/PeopleAdd";
// 채팅목록
import ChatList from "./component/ChatList";
// 채팅방
import ChatRoom from "./component/ChatRoom";
// 기타
import Other from "./component/Other";
// 프로필
import Profile from "./component/Profile";
// 공지사항
import Notice from "./component/Notice";
// 버전
import Version from "./component/Version";
// 헬프
import Help from "./component/Help";
// CSS
import './styles/App.css';

const colorTheme = createMuiTheme({
  palette: {
    primary: {
      main: '#333333',
    },
    secondary: {
      main: '#ff3d00',
    },
    info: {
      main: '#8bc34a',
    },
  },
});

const UserData = (auth, setAuthInfo) => {
  let db = firebase.database();
  let ref = db.ref("/users/" + auth.uid);

  ref
  .on("value", snapshot => {
    setAuthInfo({
      ...auth,
      name: snapshot.val().name,
      image: snapshot.val().image
    });
  });
}

function App() {
  const [authInfo, setAuthInfo] = React.useState({
    auth: false,
    uid: "",
    email: "",
    image: "",
    header: ""
  });
  const [myTheme, setMyTheme] = React.useState(colorTheme);

  // 로그인 유무를 체크후 헤더에 넘겨주기
  const handleAuth = (e) => {
    setAuthInfo(e);
    if (e.auth) {
      UserData(e, setAuthInfo);
    }
  };

  return (
    <Router>
      <ThemeProvider theme={myTheme}>
        { authInfo.auth ? <CssBaseline /> : "" }
        <Switch>
          {
            authInfo.auth ?
              <Route exact path="/" render={() => <People>{authInfo}</People>} /> :
              <Route exact path="/" render={() => <Login params={handleAuth} />} />
          }
          <Route path="/user/registry" render={() => <Registry />} />
          <Route path="/people/add" render={() => <PeopleAdd>{authInfo}</PeopleAdd>} />
          <Route path="/chat/list" render={() => <ChatList>{authInfo}</ChatList>} />
          <Route path="/chat/room/:chatid" render={() => <ChatRoom>{authInfo}</ChatRoom>} />
          <Route path="/other/main" render={() => <Other>{authInfo}</Other>} />
          <Route path="/other/profile" render={() => <Profile>{authInfo}</Profile>} />
          <Route path="/other/notice" render={() => <Notice>{authInfo}</Notice>} />
          <Route path="/other/version" render={() => <Version>{authInfo}</Version>} />
          <Route path="/other/help" render={() => <Help>{authInfo}</Help>} />
        </Switch>
      </ThemeProvider>
    </Router>
  );
}

export default App;