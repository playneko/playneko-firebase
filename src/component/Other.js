import React from 'react';

// 컴포넌트
// 로그인 체크
import CheckLogin from "./CheckLogin";
// Header
import Header from "./OtherHeader";
// Footer
import Footer from "./Footer";
// CSS
import '../styles/App.css';

const Other = (props) => {
  // 로그인 체크
  CheckLogin(props);

  return (
    <>
      <Header />
      <Footer />
    </>
  );
}

export default Other;