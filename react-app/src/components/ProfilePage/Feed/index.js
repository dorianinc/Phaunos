import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ModalButton from "../../ModalButton";
import "./Feed.css";

const Feed = () => {
  const dispatch = useDispatch();

  return (
    <>
      <h1 id="profile-list-header">Feed</h1>
    </>
  );
};

export default Feed;
