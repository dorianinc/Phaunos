import { useSelector, useDispatch } from "react-redux";
import ModalButton from "../../ModalButton";
import ReviewForm from "../ReviewForm";
import DeleteReview from "../DeleteReview";
import { addFollowerThunk, removeFollowerThunk } from "../../../store/session";
import "./ReviewItem.css";

function ReviewItem({ review, trail }) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user);
  let followingIds;
  if (user) {
    followingIds = user.following.map((user) => user.id);
  }

  const handleFollow = (e, userId, action) => {
    e.preventDefault();
    if (action === "follow") dispatch(addFollowerThunk(userId));
    if (action === "unfollow") dispatch(removeFollowerThunk(userId));
  };

  if (!review) return null;
  return (
    <div key={review.id}>
      <div className="trail-details-review">
        <div className="trail-details-review-info">
          <div>
            <div className="profile-pic-container review">
              <img
                className="profile-pic review"
                alt="profile-pic"
                src={review.user.profile_pic ? review.user.profile_pic : review.user.default_pic}
              />
            </div>
            <div>
              <p id="review-user-name">
                {review.user.first_name} {review.user.last_name}
              </p>
              <p id="review-date">{review.date_submitted.split("00")[0]}</p>
            </div>
          </div>
          {user &&
            user.id !== review.user.id &&
            (!followingIds.includes(review.user.id) ? (
              <button
                className="user-follow-button"
                onClick={(e) => handleFollow(e, review.user.id, "follow")}
              >
                <i className="fa-solid fa-user-plus primary-color fa-xl" />
              </button>
            ) : (
              <button
                className="user-follow-button"
                onClick={(e) => handleFollow(e, review.user.id, "unfollow")}
              >
                <i className="fa-regular fa-circle-check primary-color fa-2xl" />
              </button>
            ))}
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
      {user && user.id === review.user_id ? (
        <div className="review-item-options">
          <ModalButton
            nameOfClass=""
            modalComponent={<DeleteReview reviewId={review.id} trailId={trail.id} />}
            buttonContent={<p id="delete-option">Delete</p>}
          />
          <p>|</p>
          <ModalButton
            nameOfClass=""
            modalComponent={<ReviewForm review={review} trail={trail} method="update" />}
            buttonContent={<p id="edit-option">Edit</p>}
          />
        </div>
      ) : null}
      <hr className="item-divider" />
    </div>
  );
}

export default ReviewItem;
