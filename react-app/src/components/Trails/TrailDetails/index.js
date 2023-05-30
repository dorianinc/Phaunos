import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getTrailsThunk } from "../../../store/trails";
import TrailItem from "../TrailItem";
import BookmarkList from "../../Bookmark";
import BookmarkTab from "../../Bookmark/BookmarkTab";
import ModalButton from "../../ModalButton";
import ReviewItem from "../../Reviews/ReviewItem";
import ReviewForm from "../../Reviews/ReviewForm";
import WeatherForecast from "../../Weather";
import "./TrailDetails.css";

const TrailDetails = () => {
  const { trailId } = useParams();
  const dispatch = useDispatch();

  const user = useSelector((state) => state.session.user);

  const getTrails = useSelector((state) => state.trails);
  const trail = getTrails[`${trailId}`];
  const allTrails = Object.values(getTrails).filter((x) => (x.id !== trail.id) && (x.park === trail.park));

  useEffect(() => {
    document.body.style.backgroundColor = "#efefec";
    window.scrollTo(0, 0);
    return () => {
      document.body.style.backgroundColor = "#fff";
    };
  });

  useEffect(() => {
    dispatch(getTrailsThunk());
  }, [dispatch, trailId]);

  if (!trail) return null;
  const reviews = [...trail.reviews].reverse();
  console.log("trail in trail details👉", trail);

  return (
    <div className="trail-details-container">
      <div className="trail-details-card">
        <img alt="cover" className="cover-image" src={trail.cover.img_src} />
        <div className="trail-details-summary">
          <h1 className="trail-details-name">{trail.name}</h1>
          <div className="trail-details-sub-header">
            <p>
              {trail.difficulty} • <i className="fa-solid fa-star fa-xs" />{" "}
              {Number(trail.avg_rating).toFixed(1)}({trail.num_reviews})
            </p>
            <p>{trail.park}</p>
          </div>
        </div>
        {user && (
          <div className="bookmark-icon single">
            <BookmarkTab
              type="bookmark"
              trailId={trail.id}
              modalComponent={<BookmarkList trail={trail} />}
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
                <td id="length-td">{trail.len}</td>
                <td id="elevation-td">{trail.elevation}</td>
                <td id="route-type-td">{trail.route_type}</td>
              </tr>
            </tbody>
          </table>
          <div className="trail-details-desc">{trail.description}</div>
          <hr className="item-divider" />
          <div className="trail-details-tiles">
            {trail.attractions.map((attraction, i) => (
              <p key={i} id="tile">
                {attraction}
              </p>
            ))}
            {trail.activities.map((activity, i) => (
              <p key={i} id="tile">
                {activity}
              </p>
            ))}
            {trail.suitability.map((suitability, i) => (
              <p key={i} id="tile">
                {suitability}
              </p>
            ))}
          </div>
          <hr className="item-divider" />
          <div className="trail-details-weather">
            <WeatherForecast lat={trail.lat} lng={trail.long} />
          </div>
          <hr className="item-divider" />
          <div className="trail-details-reviews-summary">
            <div className="trail-details-review-graph">
              <img id="dummy-graph" alt="dummy" src="/images/dummy-graph.png"/>
            </div>
            <div className="trail-details-review-avg">
              <p id="avg-rating">{Number(trail.avg_rating).toFixed(1)}</p>
              <div>
                <div id="stars">
                  {(() => {
                    let stars = [];
                    for (let i = 0; i < Math.round(Number(trail.avg_rating)); i++) {
                      stars.push(<i className="fa-solid fa-star fa-xs" />);
                    }
                    return stars;
                  })()}
                </div>
                <p id="num-reviews">
                  {trail.num_reviews} {trail.num_reviews === 1 ? "review" : "reviews"}
                </p>
              </div>
            </div>
            {user ? (
              <div className="trail-details-review-add">
                <ModalButton
                  modalComponent={<ReviewForm trail={trail} method="create" />}
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
            {reviews.map((review, i) => (
              <ReviewItem key={i} review={review} />
            ))}
          </div>
        </div>
        <div className="trail-details-sidebar">
          <h2 id="sidebar-header">Nearby Trails</h2>
          {allTrails.map((trail, i) => (
            <TrailItem key={i} trail={trail} nameOfClass="trail" />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TrailDetails;
