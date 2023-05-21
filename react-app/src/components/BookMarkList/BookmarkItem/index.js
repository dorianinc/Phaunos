import { useDispatch } from "react-redux";
import { useModal } from "../../../context/Modal";
import { useLocation } from "react-router-dom";
import { addBookmarkThunk, deleteListThunk } from "../../../store/lists";
import ModalButton from "../../ModalButton";
import DeleteList from "../DeleteList";

function BookmarkItem({ list, trailId }) {
  const dispatch = useDispatch();
  const location = useLocation();
  const pathName = location.pathname;

  const handleClick = async (e, listId) => {
    e.preventDefault();
    const newBookmark = { trailId, listId };
    dispatch(addBookmarkThunk(newBookmark));
  };

  if (!list) return null;
  return (
    <>
      <div className="bookmark-item">
        <div className="bookmark-tab">
          <i className="fa-regular fa-bookmark fa-lg" />
        </div>
        <div className="bookmark-summary">
          <p>{list.title}</p>
          <p>
            {list.length} {list.length === 1 ? "item" : "items"}
          </p>
        </div>
        {list.title === "My Favorites" ? null : pathName === "/profile" ? (
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
