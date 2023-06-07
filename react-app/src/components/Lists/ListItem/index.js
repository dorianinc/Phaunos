import { useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useHistory } from "react-router-dom";
import { addBookmarkThunk, editListThunk, deleteBookmarkThunk } from "../../../store/lists";
import { getUserBookmarksThunk } from "../../../store/bookmarks";
import ModalButton from "../../ModalButton";
import DeleteList from "../DeleteList";

function ListItem({ list, trailId }) {
  const [title, setTitle] = useState(() => {
    if (list) return list.title;
  });
  const [hoveredList, setHoveredList] = useState("");
  const [edit, setEdit] = useState(false);
  const [focus, setFocus] = useState(false);
  const dispatch = useDispatch();
  const location = useLocation();
  const history = useHistory();
  const pathName = location.pathname;

  const handleEdit = async (e) => {
    e.stopPropagation();
    setEdit(true);
    setFocus(true);
  };

  const handleKeyDown = async (e, listId) => {
    e.stopPropagation();
    if (e.key === "Enter" || e.key === "Escape") {
      if (title !== list.title) await dispatch(editListThunk({ title, listId }));
      setEdit(false);
      setFocus(false);
    }
  };

  const handleBlur = async (e, listId) => {
    e.stopPropagation();
    if (title !== list.title) await dispatch(editListThunk({ title, listId }));
    setEdit(false);
  };

  const handleClick = async (e, listId) => {
    e.preventDefault();
    if (!focus && pathName.startsWith("/profile")) history.push(`lists/${listId}`);
    setFocus(false);
  };

  if (!list || !list.bookmarks) return null;
  const isBookmarked = !!list.bookmarks.filter((bookmark) => bookmark.trail_id === trailId).length;

  const handleBookmark = async (e, listId) => {
    e.stopPropagation();
    
    if (!isBookmarked) {
      const newBookmark = { trailId, listId };
      await dispatch(addBookmarkThunk(newBookmark));
      dispatch(getUserBookmarksThunk());

    } else {

      const bookmark = list.bookmarks.filter((bookmark) => bookmark.trail_id === trailId);
      const bookmarkId = bookmark[0].id;
      await dispatch(deleteBookmarkThunk({ bookmarkId }));
      dispatch(getUserBookmarksThunk());

    }
  };

  return (
    <>
      <div
        className={`bookmark-item`}
        style={pathName.startsWith("/profile") ? { cursor: "pointer" } : null}
        onClick={(e) => handleClick(e, list.id)}
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
                onClick={(e) => e.stopPropagation()}
                onBlur={(e) => handleBlur(e, list.id)}
                onKeyDown={(e) => handleKeyDown(e, list.id)}
                onChange={(e) => setTitle(e.target.value)}
              />
            ) : (
              <p>{list.title}</p>
            )}
            {list.title === "My Favorites" && pathName === "/profile" ? null : pathName ===
                "/profile" && list.id === hoveredList ? (
              <button onClick={(e) => handleEdit(e)} className="edit-button">
                <i className="fa-regular fa-pen-to-square" />
              </button>
            ) : null}
          </div>
          <p>
            {list.len} {list.len === 1 ? "item" : "items"}
          </p>
        </div>
        {list.title === "My Favorites" && pathName === "/profile" ? null : pathName ===
          "/profile" ? (
          <ModalButton
            nameOfClass={"postion-end"}
            modalComponent={<DeleteList listId={list.id} />}
            buttonContent={
              <div className="postion-end">
                <div className="trash-can">
                  <i className="fa-regular fa-trash-can" />
                </div>
              </div>
            }
          />
        ) : (
          <div className="postion-end">
            <input
              onClick={(e) => handleBookmark(e, list.id)}
              type="checkbox"
              checked={isBookmarked}
            />
          </div>
        )}
      </div>
      <hr className="item-divider" />
    </>
  );
}

export default ListItem;
