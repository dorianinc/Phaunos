import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getSingleTrailThunk } from "../../../store/trails";
import ModalButton from "../../ModalButton";
import ReviewItem from "../../Reviews/ReviewItem";
import ReviewForm from "../../Reviews/ReviewForm";
import "./TrailDetails.css";

const TrailDetails = () => {
  const { trailId } = useParams();
  const dispatch = useDispatch();
  const trail = useSelector((state) => state.trails);

  useEffect(() => {
    document.body.style.backgroundColor = "#efefec";
    return () => {
      document.body.style.backgroundColor = "#fff";
    };
  });

  useEffect(() => {
    dispatch(getSingleTrailThunk(trailId));

  }, [dispatch, trailId]);

  if (!trail.id) return null;
  const reviews = [...trail.reviews].reverse()

  return (
    <div className="trail-details-container">
      <div className="trail-details-card">
        <img alt="cover" className="cover-image" src={trail.cover.img_src} />
        <div className="trail-details-summary">
          <h1 className="trail-details-name">{trail.name}</h1>
          <p>
            {trail.difficulty} • {Number(trail.avg_rating).toFixed(1)}
          </p>
          <p>{trail.park}</p>
        </div>
      </div>
      <div className="trail-details-info-container">
        <div className="trail-details-info">
          <table className="trail-details-table">
            <tr>
              <th id="length-th">Length</th>
              <th id="elevation-th">Elevation gain</th>
              <th id="route-type-th">Route type</th>
            </tr>
            <tr>
              <td id="length-td">{trail.len}</td>
              <td id="elevation-td">{trail.elevation}</td>
              <td id="route-type-td">{trail.route_type}</td>
            </tr>
          </table>
          <div className="trail-details-desc">{trail.description}</div>
          <hr className="item-divider" />
          <div className="trail-details-tiles">
            {trail.attractions.map((attraction) => (
              <p id="tile">{attraction}</p>
            ))}
            {trail.activities.map((activity) => (
              <p id="tile">{activity}</p>
            ))}
            {trail.suitability.map((suitability) => (
              <p id="tile">{suitability}</p>
            ))}
          </div>
          <hr className="item-divider" />
          <div className="trail-details-weather">5 DAY WEATHER FORECAST GOES HERE</div>
          <hr className="item-divider" />
          <div className="trail-details-reviews-summary">
            <div className="trail-details-review-graph">
              <p>graph goes here</p>
            </div>
            <div className="trail-details-review-avg">
              <p id="avg-rating">{Number(trail.avg_rating).toFixed(1)}</p>
              <div>
                <div id="stars">
                  {(() => {
                    let stars = [];
                    for (let i = 0; i < Math.round(Number(trail.avg_rating)); i++) {
                      stars.push(<i class="fa-solid fa-star fa-xs" />);
                    }
                    return stars;
                  })()}
                </div>
                <p id="num-reviews">
                  {trail.num_reviews} {trail.num_reviews === 1 ? "review" : "reviews"}
                </p>
              </div>
            </div>
            <div className="trail-details-review-add">
              <ModalButton
                modalComponent={<ReviewForm trail={trail} method="create"/>}
                buttonContent={<button className="green-button review">Write review</button>}
              />
            </div>
          </div>
          <hr className="item-divider" />
          <div className="trail-details-reviews-container">
            {reviews.map((review) => (
                <ReviewItem review={review}/>
            ))}
          </div>
        </div>
        <div className="trail-details-sidebar">test</div>
      </div>
    </div>
  );
};

export default TrailDetails;