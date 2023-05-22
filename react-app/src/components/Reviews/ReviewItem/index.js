function ReviewItem({ review }) {
  //   if (!review) return null;
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
            <p id="review-date">{review.date_submitted}</p>
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
      <hr className="item-divider" />
    </>
  );
}

export default ReviewItem;
