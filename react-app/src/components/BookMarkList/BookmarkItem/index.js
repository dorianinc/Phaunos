import { useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { addBookmarkThunk, editListThunk } from "../../../store/lists";
import ModalButton from "../../ModalButton";
import DeleteList from "../DeleteList";

function BookmarkItem({ list, trailId }) {
  const [title, setTitle] = useState(list.title);
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

  const handleKeyDown = async (e, listId) => {
    if (e.key === "Enter" || e.key === "Escape") {
      if(title !== list.title) await dispatch(editListThunk({title, listId}))
      setEdit(false);
    }
  };

  const handleBlur = async (listId) => {
    if(title !== list.title)  await dispatch(editListThunk({title, listId}))
    setEdit(false);
  };

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
                value={title}
                onBlur={(e) => handleBlur(list.id)}
                onKeyDown={(e) => handleKeyDown(e, list.id)}
                onChange={(e) => setTitle(e.target.value)}
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
