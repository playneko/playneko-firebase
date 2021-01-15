import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/styles';
import { createMuiTheme } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

// 컴포넌트
// Firebase
// import firebase from './component/Firebase'
// Header
import Header from "./component/Header";
// 로그인
import Login from "./component/Login";
// 친구목록
import People from "./component/People";
// 친구추가
import PeopleAdd from "./component/PeopleAdd";
// Footer
import Footer from "./component/Footer";
// CSS
import './styles/App.css';

// const getFireDB = () => {
//   // Firebase 로그인 체크
//   firebase.auth().onAuthStateChanged(user => {
//     if (user) {
//       // 로그인
//       console.log(true);
//     } else {
//       // 로그아웃
//       console.log(false);
//     }
//   })
// }

const colorTheme = createMuiTheme({
  palette: {
    primary: {
      main: '#212121',
    },
    secondary: {
      main: '#ff3d00',
    },
  },
});

function App() {
  const [authInfo, setAuthInfo] = React.useState({
    auth: false,
    uid: "",
    email: ""
  });
  const [myTheme, setMyTheme] = React.useState(colorTheme);

  // 로그인 유무를 체크후 헤더에 넘겨주기
  const handleAuth = (e) => {
    setAuthInfo(e);
  };

  if (authInfo.auth) {
    return (
      <Router>
        <ThemeProvider theme={myTheme}>
          <CssBaseline />
          <Header />
          <Switch>
            <Route path="/" render={() => <People>{authInfo}</People>} />
            <Route path="/people/add" render={() => <PeopleAdd />} />
          </Switch>
          <Footer />
        </ThemeProvider>
      </Router>
    );
  } else {
    return (
      <Router>
        <ThemeProvider theme={myTheme}>
          <Switch>
            <Route path="/" render={() => <Login params={handleAuth} />} />
          </Switch>
        </ThemeProvider>
      </Router>
    );
  }
}

export default App;
