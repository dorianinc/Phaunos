import { useSelector } from "react-redux";
import ModalButton from "../../ModalButton";
import ReviewForm from "../ReviewForm";
import DeleteReview from "../DeleteReview";
import "./ReviewItem.css";

function ReviewItem({ review }) {
  const user = useSelector((state) => state.session.user);

  if (!review) return null;
  return (
    <div key={review.id}>
      <div className="trail-details-review">
        <div className="trail-details-review-info">
          <img
            className="profile-pic review"
            alt="profile-pic"
            src="https://res.cloudinary.com/dkuhmdf7w/image/upload/v1684768954/Phaunos/animal-icons/wolf.png"
          />
          <div>
            <p id="review-user-name">
              {review.user.first_name} {review.user.last_name}
            </p>
            <p id="review-date">{review.date_submitted.split("00")[0]}</p>
          </div>
        </div>
      </div>
      <div className="trail-details-review-rating">
        {(() => {
          let stars = [];
          for (let i = 0; i < review.rating; i++) {
            stars.push(<i className="fa-solid fa-star fa-xs" />);
          }
          return stars;
        })()}
      </div>
      <div className="trail-details-review-desc">
        <p>{review.description}</p>
      </div>
      {/* {user.id === review.user_id ? (
        
      )} */}
      {user && user.id === review.user_id ? (
        <div className="review-item-options">
          <ModalButton
            nameOfClass=""
            modalComponent={<DeleteReview reviewId={review.id} trailId={review.trail.id} />}
            buttonContent={<p id="delete-option">Delete</p>}
          />
          <p>|</p>
          <ModalButton
            nameOfClass=""
            modalComponent={<ReviewForm review={review} trail={review.trail} method="update" />}
            buttonContent={<p id="edit-option">Edit</p>}
          />
        </div>
      ) : null}
      <hr className="item-divider" />
    </div>
  );
}

export default ReviewItem;
