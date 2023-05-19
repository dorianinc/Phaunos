import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import BookmarkItem from "./BookmarkItem"
import "./BookmarkList.css";

function BookmarkList({ trailId }) {
  const { closeModal } = useModal();
  const dispatch = useDispatch();

  const handleClick = (e, trailId) => {
    e.preventDefault();
    alert("id =>", trailId);
    closeModal();
  };

  return (
    <div className="bookmark-modal">
      <img className="x-mark" onClick={closeModal} src="/images/mark.png" />
      <h1>Save to list</h1>
      <div className="create-list">
        <img className="plus-sign" src="/images/plus.png" />
        <p>Create New List</p>
      </div>
      <hr />
      <div className="bookmark-item">
        <div className="bookmark-tab">
          <i className="fa-regular fa-bookmark fa-lg" />
        </div>
        <div className="bookmark-summary">
          <p>My Favorites</p>
          <p>0 items</p>
        </div>
        <div className="bookmark-checkbox">
          <input type="checkbox"/>
        </div>
      </div>
      <hr/>
      <BookmarkItem bookmark={test}/>
    </div>
  );
}

export default BookmarkList;
