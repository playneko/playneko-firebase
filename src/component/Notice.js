import React from 'react';
import { useHistory } from "react-router-dom";

// 컴포넌트
// 로그인 체크
import CheckLogin from "./CheckLogin";
// Header
import Header from "./OtherHeader";

const Other = (props) => {
  const history = useHistory();
  const auth = props.children;

  // 로그인 체크
  CheckLogin(props);

  return (
    <>
      <Header>notice</Header>
    </>
  );
}

export default Other;