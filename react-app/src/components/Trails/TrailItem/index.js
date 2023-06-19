import { useHistory, useLocation, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { deleteBookmarkThunk } from "../../../store/lists";
import { useMap } from "../../../context/MapContext";
import BookmarkTab from "../../Bookmark/BookmarkTab";
import BookmarkList from "../../Bookmark";
import CompletedTab from "../../CompletedTab";
import "./TrailItem.css";

function TrailItem({ trail, bookmarkId, listId, nameOfClass, editing }) {
  const { setCurrentZoom, setCurrentLat, setCurrentLng } = useMap();
  const history = useHistory();
  const location = useLocation();
  const dispatch = useDispatch();
  const pathName = location.pathname;

  const user = useSelector((state) => state.session.user);

  const handleClick = (e, trail) => {
    e.preventDefault();
    if (pathName.startsWith("/profile")) {
      setCurrentLat(trail.lat);
      setCurrentLng(trail.lng);
      setCurrentZoom(18);
    } else {
      history.push(`/trails/${trail.id}`);
      window.scrollTo(0, 0);
    }
  };

  const handleDelete = async (e, bookmarkId) => {
    e.stopPropagation();
    dispatch(deleteBookmarkThunk({ bookmarkId }, listId));
  };

  if (!trail.id || !trail.cover) return null;
  return (
    <>
      <div className={`trail-item ${nameOfClass}`} onClick={(e) => handleClick(e, trail)}>
        <div>
          <img className={`trail-image ${nameOfClass}`} alt="cover" src={trail.cover.img_src} />
        </div>
        <div className={`trail-text ${nameOfClass}`}>
          <div className="trail-card-top">
            <p id="trail-diff-review">
              {trail.difficulty} • <i className="fa-solid fa-star fa-xs" />{" "}
              {Number(trail.avg_rating).toFixed(1)}({trail.num_reviews})
            </p>
            {pathName.startsWith("/profile/lists") && (
              <Link to={`/trails/${trail.id}`}>
                <p className="secondary-color" id="trail-link">
                  View Trail
                </p>
              </Link>
            )}
          </div>
          <div className="trail-card-bottom">
            <p id={`trail-name`}>{trail.name}</p>
            <p id={`trail-park`}>{trail.park}</p>
            <p id={`trail-len`}>{trail.len}</p>
          </div>
        </div>
        {user && !pathName.startsWith("/profile") ? (
          <div className="bookmark-icon cards">
            <BookmarkTab
              type="bookmark"
              trailId={trail.id}
              modalComponent={<BookmarkList trail={trail} />}
            />
          </div>
        ) : user && pathName.startsWith("/profile") && !editing ? (
          <CompletedTab
            type="bookmark"
            trailId={trail.id}
            modalComponent={<BookmarkList trail={trail} />}
          />
        ) : editing ? (
          <>
            <div className="item-overlay" />
            <div className="trash-icon" onClick={(e) => handleDelete(e, bookmarkId)}>
              <i className="fa-regular fa-trash-can trail" />
            </div>
          </>
        ) : null}
      </div>
    </>
  );
}

export default TrailItem;
