import { useEffect } from "react";
import { useModal } from "../../context/Modal";
import { useDispatch, useSelector } from "react-redux";
import { getUserListsThunk } from "../../store/lists";
import BookmarkItem from "./BookmarkItem";
import NewList from "./NewList";
import ModalButton from "../ModalButton";
import "./BookmarkList.css";

function BookmarkList({ trailId }) {
  console.log("trailId  in BookmarkList 👉", trailId);
  const { closeModal } = useModal();

  const getLists = useSelector((state) => state.lists);
  const lists = Object.values(getLists);
  
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserListsThunk());
  }, [dispatch]);

  return (
    <div className="bookmark-modal">
      <img className="x-mark" alt="close" onClick={closeModal} src="/images/mark.png" />
      <h1>Save to list</h1>
      <hr className="header-divider" />
      <ModalButton
        modalComponent={<NewList trailId={trailId} />}
        buttonContent={
          <div className="create-list">
            <img className="plus-sign" alt="add" src="/images/plus.png" />
            <p>Create New List</p>
          </div>
        }
      />
      <hr className="item-divider" />
      <div className="list-container">
        {lists.map((list) => (
          <BookmarkItem trailId={trailId} list={list} />
        ))}
      </div>
      <div className="buttons">
        <button id="done-button" className="green-button">
          Done
        </button>
      </div>
    </div>
  );
}

export default BookmarkList;

// onClick={(e) => handleClick(e)}
