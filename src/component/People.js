import React, { useEffect } from 'react';
import { useHistory } from "react-router-dom";
import firebase from "firebase";

const Friends = (uid, setfriends) => {
  let db = firebase.database();
  let ref = db.ref("/friends/" + uid);
  console.log(ref);

  useEffect(() => {
    ref
      .orderByKey()
      .limitToFirst(10)
      .on("value", snapshot => {
        console.log(snapshot);
        setfriends({
          data: snapshot.val()
        });
      });
  }, [uid]);
}

const ListRender = (friends) => {
  const lists = friends.children.data;
  console.log(lists);
  return (
    <>
    {
      Object.keys(lists).map((item, idx) => (
        <div>{console.log(idx)},{console.log(lists[item].name)}</div>
      ))
    }
    </>
  );
}

const People = (props) => {
  let history = useHistory();
  const [friends, setfriends] = React.useState(null);
  // const [error, setError] = React.useState(null);
  // const [loading, setLoading] = React.useState(false);

  Friends(props.children.uid, setfriends);
  console.log(props.children.uid);
  console.log(friends);

  return (
    <>
    {friends != null ? <ListRender>{friends}</ListRender> : ""}
    </>
  );
}

export default People;