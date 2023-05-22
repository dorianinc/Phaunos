import { useEffect, useState } from "react";

const StarsRatingInput = ({ stars, onChange }) => {
  const [activeRating, setActiveRating] = useState(stars);

  useEffect(() => {
    setActiveRating(stars);
  }, [stars]);

  return (
    <div className="new-review-rating-input">
      <div
        className="goldStars"
        onMouseEnter={() => {
          setActiveRating(1);
        }}
        onMouseLeave={() => {
          setActiveRating(stars);
        }}
        onClick={() => {
          onChange(1);
        }}
      >
        <i
          className={activeRating >= 1 ? "fa-solid fa-star fa-xl" : "fa-regular fa-star fa-xl"}
        />
      </div>
      <div
        className="goldStars"
        onMouseEnter={() => {
          setActiveRating(2);
        }}
        onMouseLeave={() => {
          setActiveRating(stars);
        }}
        onClick={() => {
          onChange(2);
        }}
      >
        <i
          className={activeRating >= 2 ? "fa-solid fa-star fa-xl" : "fa-regular fa-star fa-xl"}
        />
      </div>
      <div
        className="goldStars"
        onMouseEnter={() => {
          setActiveRating(3);
        }}
        onMouseLeave={() => {
          setActiveRating(stars);
        }}
        onClick={() => {
          onChange(3);
        }}
      >
        <i
          className={
            activeRating >= 3 ? "fa-solid fa-star fa-lg fa-xl" : "fa-regular fa-star fa-xl"
          }
        />
      </div>
      <div
        className="goldStars"
        onMouseEnter={() => {
          setActiveRating(4);
        }}
        onMouseLeave={() => {
          setActiveRating(stars);
        }}
        onClick={() => {
          onChange(4);
        }}
      >
        <i
          className={activeRating >= 4 ? "fa-solid fa-star fa-xl" : "fa-regular fa-star fa-xl"}
        />
      </div>
      <div
        className="goldStars"
        onMouseEnter={() => {
          setActiveRating(5);
        }}
        onMouseLeave={() => {
          setActiveRating(stars);
        }}
        onClick={() => {
          onChange(5);
        }}
      >
        <i
          className={activeRating >= 5 ? "fa-solid fa-star fa-xl" : "fa-regular fa-star fa-xl"}
        />
      </div>
    </div>
  );
};

export default StarsRatingInput;
