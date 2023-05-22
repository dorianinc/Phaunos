import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../../context/Modal";
import { addTrailReviewThunk } from "../../../store/trails";
import StarsRatingInput from "./StarsRatingInput/StarsRatingInput";
import "./ReviewForm.css";

function ReviewForm({ trail }) {
  const [description, setDescription] = useState("");
  const [rating, setRating] = useState(0);
  const [buttonClass, setButtonClass] = useState("green-button disabled");
  const { closeModal } = useModal();
  const dispatch = useDispatch();

  useEffect(() => {
    if (description.length >= 10 && rating >= 1) {
      setButtonClass("green-button");
    }else{
        setButtonClass("green-button disabled");
    }
  }, [description, rating]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newReview = { description, rating };
    await dispatch(addTrailReviewThunk(trail.id, newReview))
    closeModal()
    //   .then(closeModal)
    //   .catch(async (res) => {
    //     const data = await res.json();
    //     if (data && data.errors) {
    //       setErrorsObj(data.errors);
    //     }
    //   });
  };

  const onChange = (number) => {
    setRating(parseInt(number));
  };

  return (
    <div className="new-review-modal">
      <img className="x-mark" alt="close" onClick={closeModal} src="/images/mark.png" />
      <h1 className="new-review-header"> Leave a Review</h1>
      <h2 className="new-review-trail-name">{trail.name}</h2>
      <hr className="item-divider" />
      <form className="loginForm" onSubmit={(e) => handleSubmit(e)}>
        <p className="new-review-rating">Rating</p>
        <StarsRatingInput onChange={onChange} stars={rating} />
        <p>Review</p>
        <textarea
          name="description"
          className="text-area review"
          value={description}
          placeholder="Give back to the community, Share your thoughts about the trail so others know what to expect."
          onChange={(e) => setDescription(e.target.value)}
        />
        <div className="buttons">
          <button className={buttonClass} disabled={buttonClass.includes("disabled")}>
            Post
          </button>
        </div>
      </form>
    </div>
  );
}

export default ReviewForm;
