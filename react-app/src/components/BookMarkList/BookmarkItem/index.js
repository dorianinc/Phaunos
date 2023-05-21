import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../../context/Modal";
import { useLocation } from "react-router-dom";
import { addBookmarkThunk, deleteListThunk } from "../../../store/lists";
import ModalButton from "../../ModalButton";
import DeleteList from "../DeleteList";

function BookmarkItem({ list, trailId }) {
  const [newTitle, setNewTitle] = useState(list.title);
  const [hoveredList, setHoveredList] = useState("");
  const [edit, setEdit] = useState(false);
  const dispatch = useDispatch();
  const location = useLocation();
  const pathName = location.pathname;

  const handleClick = async (e, listId) => {
    e.preventDefault();
    const newBookmark = { trailId, listId };
    dispatch(addBookmarkThunk(newBookmark));
  };

  const handleKeyDown = (event, listId) => {
    if (event.key === "Enter" || event.key === "Escape") {
      console.log("listId 👉", listId)
      console.log("IN THE KEYDOWN FUNCTION");
      setEdit(false);
      console.log("state ==>", edit);
    }
  };

  const handleBlur = (event, listId) => {
    console.log("listId 👉", listId)
    console.log("IN THE BLUR FUNCTION");
    setEdit(false);
    console.log("state ==>", edit);
  };

  useEffect(() => {
    console.log(newTitle);
  });

  if (!list) return null;
  return (
    <>
      <div 
      className="bookmark-item"
      onMouseEnter={() => setHoveredList(list.id)}
      onMouseLeave={() => setHoveredList("")}
      >
        <div className="bookmark-tab">
          <i className="fa-regular fa-bookmark fa-lg" />
        </div>
        <div className="bookmark-summary">
          <div className="title-field">
            {edit === true ? (
              <input
                value={newTitle}
                onBlur={(e) => handleBlur(e, list.id)}
                onKeyDown={(e) => handleKeyDown(e, list.id)}
                onChange={(e) => setNewTitle(e.target.value)}
              />
            ) : (
              <p>{list.title}</p>
            )}
            {list.title === "My Favorites" && pathName === "/profile" ? null : pathName ===
              "/profile" && list.id === hoveredList ? (
              <button onClick={() => setEdit(!edit)} className="edit-button">
                <i class="fa-regular fa-pen-to-square" />
              </button>
            ) : null}
          </div>
          <p>
            {list.length} {list.length === 1 ? "item" : "items"}
          </p>
        </div>
        {list.title === "My Favorites" && pathName === "/profile" ? null : pathName ===
          "/profile" ? (
          <ModalButton
            modalComponent={<DeleteList listId={list.id} />}
            buttonContent={
              <div className="list-options">
                <div className="trash-can">
                  <i class="fa-regular fa-trash-can" />
                </div>
              </div>
            }
          />
        ) : (
          <div className="list-options">
            <input onClick={(e) => handleClick(e, list.id)} type="checkbox" />
          </div>
        )}
      </div>
      <hr className="item-divider" />
    </>
  );
}

export default BookmarkItem;
