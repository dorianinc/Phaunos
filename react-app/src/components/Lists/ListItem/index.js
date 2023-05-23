import { useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useHistory } from "react-router-dom";
import { addBookmarkThunk, editListThunk } from "../../../store/lists";
import ModalButton from "../../ModalButton";
import DeleteList from "../DeleteList";

function ListItem({ list, trailId }) {
  const [title, setTitle] = useState(() => {
    if (list) return list.title;
  });
  const [hoveredList, setHoveredList] = useState("");
  const [edit, setEdit] = useState(false);
  const dispatch = useDispatch();
  const location = useLocation();
  const history = useHistory();
  const pathName = location.pathname;

  const addBookmark = async (e, listId) => {
    e.preventDefault();
    const newBookmark = { trailId, listId };
    dispatch(addBookmarkThunk(newBookmark));
  };

  const handleEdit = async (e) => {
    e.stopPropagation()
    setEdit(true)
  }

  const handleKeyDown = async (e, listId) => {
    e.stopPropagation()
    if (e.key === "Enter" || e.key === "Escape") {
      if (title !== list.title) await dispatch(editListThunk({ title, listId }));
      setEdit(false);
    }
  };

  const handleBlur = async (e, listId) => {
    e.stopPropagation()
    if (title !== list.title) await dispatch(editListThunk({ title, listId }));
    setEdit(false);
  };

  const handleClick = async (e, listId) => {
    e.preventDefault();
    if(!edit && pathName !== "/") history.push(`lists/${listId}`);
  };

  if (!list) return null;
  return (
    <>
      <div
        className="bookmark-item"
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
            nameOfClass={"list-options"}
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
            <input onClick={(e) => addBookmark(e, list.id)} type="checkbox" />
          </div>
        )}
      </div>
      <hr className="item-divider" />
    </>
  );
}

export default ListItem;
