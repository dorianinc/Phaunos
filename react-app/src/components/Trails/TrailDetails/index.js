import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getTrailsThunk } from "../../../store/trails";
import { getReviewsThunk } from "../../../store/reviews";
import TrailItem from "../TrailItem";
import BookmarkList from "../../Bookmark";
import BookmarkTab from "../../Bookmark/BookmarkTab";
import ModalButton from "../../ModalButton";
// import ReviewItem from "../../Reviews/ReviewItem";
import ReviewForm from "../../Reviews/ReviewForm";
import WeatherForecast from "../../Weather";
import DeleteReview from "../../Reviews/DeleteReview";
import "./TrailDetails.css";

const TrailDetails = () => {
  const { trailId } = useParams();
  const dispatch = useDispatch();

  const user = useSelector((state) => state.session.user);
  const getTrails = useSelector((state) => state.trails);
  console.log("getTrails  👉", getTrails )
  const currentTrail = getTrails[`${trailId}`];
  const allTrails = Object.values(getTrails).filter(
    (trail) => trail.id !== currentTrail.id && trail.park === currentTrail.park
  );

  useEffect(() => {
    document.body.style.backgroundColor = "#efefec";
    return () => {
      document.body.style.backgroundColor = "#fff";
    };
  });

  useEffect(() => {
    console.log("^^^^^^^^ DEPLOYING THUNKS ^^^^^^^")
    dispatch(getTrailsThunk());
    // dispatch(getReviewsThunk(trailId));
  }, [trailId, dispatch]);
  
  const getReviews = useSelector((state) => state.reviews);
  const reviews = Object.values(getReviews).reverse();
  console.log("getReviews in trail details 👉", getReviews);
  console.log("reviews in trail details 👉", reviews);

  if (!currentTrail) return null;
  return (
    <div className="trail-details-container">
      <div className="trail-details-card">
        <img alt="cover" className="cover-image" src={currentTrail.cover.img_src} />
        <div className="trail-details-summary">
          <h1 className="trail-details-name">{currentTrail.name}</h1>
          <div className="trail-details-sub-header">
            <p>
              {currentTrail.difficulty} • <i className="fa-solid fa-star fa-xs" />{" "}
              {Number(currentTrail.avg_rating).toFixed(1)}({currentTrail.num_reviews})
            </p>
            <p>{currentTrail.park}</p>
          </div>
        </div>
        {user && (
          <div className="bookmark-icon single">
            <BookmarkTab
              type="bookmark"
              trailId={currentTrail.id}
              modalComponent={<BookmarkList trail={currentTrail} />}
            />
          </div>
        )}
      </div>
      <div className="trail-details-info-container">
        <div className="trail-details-info">
          <table className="trail-details-table">
            <tbody>
              <tr>
                <th id="length-th">Length</th>
                <th id="elevation-th">Elevation gain</th>
                <th id="route-type-th">Route type</th>
              </tr>
              <tr>
                <td id="length-td">{currentTrail.len}</td>
                <td id="elevation-td">{currentTrail.elevation}</td>
                <td id="route-type-td">{currentTrail.route_type}</td>
              </tr>
            </tbody>
          </table>
          <div className="trail-details-desc">{currentTrail.description}</div>
          <hr className="item-divider" />
          <div className="trail-details-tiles">
            {currentTrail.attractions.map((attraction, i) => (
              <p key={i} id="tile">
                {attraction}
              </p>
            ))}
            {currentTrail.activities.map((activity, i) => (
              <p key={i} id="tile">
                {activity}
              </p>
            ))}
            {currentTrail.suitability.map((suitability, i) => (
              <p key={i} id="tile">
                {suitability}
              </p>
            ))}
          </div>
          <hr className="item-divider" />
          <div className="trail-details-weather">
            <WeatherForecast lat={currentTrail.lat} lng={currentTrail.long} />
          </div>
          <hr className="item-divider" />
          <div className="trail-details-reviews-summary">
            <div className="trail-details-review-graph">
              <img id="dummy-graph" alt="dummy" src="/images/dummy-graph.png" />
            </div>
            <div className="trail-details-review-avg">
              <p id="avg-rating">{Number(currentTrail.avg_rating).toFixed(1)}</p>
              <div>
                <div id="stars">
                  {(() => {
                    let stars = [];
                    for (let i = 0; i < Math.round(Number(currentTrail.avg_rating)); i++) {
                      stars.push(<i className="fa-solid fa-star fa-xs" />);
                    }
                    return stars;
                  })()}
                </div>
                <p id="num-reviews">
                  {currentTrail.num_reviews} {currentTrail.num_reviews === 1 ? "review" : "reviews"}
                </p>
              </div>
            </div>
            {user ? (
              <div className="trail-details-review-add">
                <ModalButton
                  modalComponent={<ReviewForm trail={currentTrail} method="create" />}
                  buttonContent={<button className="green-button review">Write review</button>}
                />
              </div>
            ) : (
              <button className="grey-button review" disabled>
                {" "}
                Write a Review
              </button>
            )}
          </div>
          <hr className="item-divider" />
          <div className="trail-details-reviews-container">
            {console.log("GETREVIEWS within the RETURN!!!!", getReviews)}
            {console.log("REVIEWS within the RETURN!!!!", reviews)}
            {!!reviews.length
              ? reviews.map((review, i) => (
                <div key={review.id}>
                <div className="trail-details-review">
                  <div className="trail-details-review-info">
                    <img
                      className="profile-pic review"
                      alt="profile-pic"
                      src={review.user.profile_pic}
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
                {user && user.id === review.user_id ? (
                  <div className="review-item-options">
                    <ModalButton
                      nameOfClass=""
                      modalComponent={<DeleteReview reviewId={review.id} trailId={currentTrail.id} />}
                      buttonContent={<p id="delete-option">Delete</p>}
                    />
                    <p>|</p>
                    <ModalButton
                      nameOfClass=""
                      modalComponent={<ReviewForm review={review} trail={currentTrail} method="update" />}
                      buttonContent={<p id="edit-option">Edit</p>}
                    />
                  </div>
                ) : null}
                <hr className="item-divider" />
              </div>
                ))
              : null}
          </div>
        </div>
        <div className="trail-details-sidebar">
          <h2 id="sidebar-header">Nearby Trails</h2>
          {allTrails.map((trail, i) => (
            <TrailItem key={trail.id} trail={trail} nameOfClass="trail" />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TrailDetails;
