import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ModalButton from "../../ModalButton";
import "./Feed.css";

const Feed = () => {
  const dispatch = useDispatch();

  return (
    <div style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
      <h1 id="profile-list-header">Feed</h1>
      <h3>Feature Coming Soon!</h3>
    </div>
  );
};

export default Feed;
