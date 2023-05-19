import { useDispatch } from "react-redux";
import { useModal } from "../../../context/Modal";
import "./BookmarkTrailModal.css";

function BookmarkTrailModal({ trailId }) {
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
      <hr/>
    </div>
  );
}

export default BookmarkTrailModal;
