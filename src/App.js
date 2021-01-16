import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/styles';
import { createMuiTheme } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

// 컴포넌트
// Header
import Header from "./component/Header";
// 로그인
import Login from "./component/Login";
// 회원가입
import Registry from "./component/Registry";
// 친구목록
import People from "./component/People";
// 친구추가
import PeopleAdd from "./component/PeopleAdd";
// Footer
import Footer from "./component/Footer";
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
            <Route exact path="/" render={() => <People>{authInfo}</People>} />
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
            <Route exact path="/" render={() => <Login params={handleAuth} />} />
            <Route path="/user/registry" render={() => <Registry />} />
          </Switch>
        </ThemeProvider>
      </Router>
    );
  }
}

export default App;
