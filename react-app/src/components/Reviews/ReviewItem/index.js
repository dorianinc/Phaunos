import ModalButton from "../../ModalButton";
import ReviewForm from "../ReviewForm";
import DeleteReview from "../DeleteReview";
import "./ReviewItem.css";

function ReviewItem({ review }) {
  if (!review) return null;
  return (
    <>
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
            stars.push(<i class="fa-solid fa-star fa-xs" />);
          }
          return stars;
        })()}{" "}
      </div>
      <div className="trail-details-review-desc">
        <p>{review.description}</p>
      </div>
      <div className="review-item-options">
        <ModalButton
          nameOfClass=""
          modalComponent={<DeleteReview reviewId={review.id} trailId={review.trail.id}/>}
          buttonContent={<p id="delete-option">Delete</p>}
        />
        <p>|</p>
        <ModalButton
          nameOfClass=""
          modalComponent={<ReviewForm review={review} trail={review.trail} method="update" />}
          buttonContent={<p id="edit-option">Edit</p>}
        />
      </div>
      <hr className="item-divider" />
    </>
  );
}

export default ReviewItem;
