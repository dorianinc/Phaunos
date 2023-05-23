import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import ModalButton from "../../ModalButton";
import BookmarkList from "../../BookMarkList";
import "./TrailItem.css";

function TrailItem({ trail }) {
  const history = useHistory();
  const user = useSelector((state) => state.session.user);

  const handleClick = (e, trailId) => {
    e.preventDefault();
    history.push(`trails/${trailId}`);
  };
  if (!trail.id || !trail.cover) return null;
  return (
    <>
      <div className="trail-item" onClick={(e) => handleClick(e, trail.id)}>
        <div>
          <img className="trail-image" alt="cover" src={trail.cover.img_src} />
        </div>
        <div className="trail-text">
          <p className="trail-name">{trail.name}</p>
          <p className="trail-park">{trail.park}</p>
        </div>
        {user && (
          <div className="bookmark-icon">
            <ModalButton type="bookmark" modalComponent={<BookmarkList trailId={trail.id} />} />
          </div>
        )}
      </div>
    </>
  );
}

export default TrailItem;
