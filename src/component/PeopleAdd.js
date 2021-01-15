import React from 'react';
import { useHistory } from "react-router-dom";

// 컴포넌트

const People = (props) => {
  let history = useHistory();
  const [users, setUsers] = React.useState(null);
  const [error, setError] = React.useState(null);
  const [loading, setLoading] = React.useState(false);

  return (
    <>
    </>
  );
}

export default People;