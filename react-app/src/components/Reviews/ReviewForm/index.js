import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../../context/Modal";
import { addReviewThunk, updateReviewThunk } from "../../../store/reviews";
import StarsRatingInput from "./StarsRatingInput/StarsRatingInput";
import "./ReviewForm.css";

function ReviewForm({ trail, review, method }) {
  const [description, setDescription] = useState("");
  const [rating, setRating] = useState(0);
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();
  const dispatch = useDispatch();

  useEffect(() => {
    if (review && review.id) {
      setDescription(review.description);
      setRating(review.rating);
    }
  }, [review]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (method === "create") {
      const newReview = { description, rating };
      const data = await dispatch(addReviewThunk(trail.id, newReview));
      if (data.errors) {
        setErrors(data.errors); 
      }else{
        closeModal()
      }
    } else {
      const reviewId = review.id;
      const updatedReview = { description, rating, reviewId };
      const data = await dispatch(updateReviewThunk(trail.id, updatedReview));
      if (data.errors) {
        setErrors(data.errors); 
      }else{
        closeModal()
      }
    }
  };

  const onChange = (number) => {
    setRating(parseInt(number));
  };

  return (
    <div className="new-review-modal">
      <img className="x-mark" alt="close" onClick={closeModal} src="/images/icons/mark.png" />
      <h1 className="primary-color">Leave a Review</h1>
      <h2 className="secondary-color">{trail.name}</h2>
      <hr className="item-divider" />
      <form className="loginForm" onSubmit={(e) => handleSubmit(e)}>
        <div className="new-review-rating-container">
        <p className="new-review-rating">Rating</p>
        <StarsRatingInput onChange={onChange} stars={rating} />
        <p className="errors">{errors.rating}</p>
        </div>

        <p>Review</p>
        <textarea
          name="description"
          className="text-area review"
          value={description}
          placeholder="Give back to the community, Share your thoughts about the trail so others know what to expect."
          onChange={(e) => setDescription(e.target.value)}
        />
        <p className="errors">{errors.description}</p>
        <p className="errors">{errors.review}</p>
        <div className="buttons">
          <button className="green-button review">Post</button>
        </div>
      </form>
    </div>
  );
}

export default ReviewForm;
