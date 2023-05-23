import { useDispatch } from "react-redux";
import { useModal } from "../../../context/Modal";
import { deleteReviewThunk } from "../../../store/reviews";
import "./DeleteReview.css";

function DeleteReview({ reviewId, trailId }) {
  const dispatch = useDispatch();
  const { closeModal } = useModal();

  const handleDelete = async (e) => {
    e.preventDefault();
    await dispatch(deleteReviewThunk({ reviewId }, trailId));
    closeModal();
  };

  return (
    <div className="delete-review">
      <h1>Delete Review?</h1>
      <p id="delete-text"> Deleting a review will erase it permanently</p>
      <div className="buttons delete">
        <div>
          <button className="green-button delete" onClick={(e) => handleDelete(e)}>
            Delete
          </button>
        </div>
        <div>
          <button className="white-button delete" onClick={closeModal}>
            Keep
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteReview;
