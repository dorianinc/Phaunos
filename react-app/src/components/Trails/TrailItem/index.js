import { useHistory, } from "react-router-dom";
import { useSelector } from "react-redux";
import ModalButton from "../../ModalButton";
import List from "../../Lists";
import "./TrailItem.css";

function TrailItem({ trail, nameOfClass }) {
  const history = useHistory();
  const user = useSelector((state) => state.session.user);

  const handleClick = (e, trailId) => {
    e.preventDefault();
    history.push(`/trails/${trailId}`);
  };
  if (!trail.id || !trail.cover) return null;
  return (
    <>
      <div className={`trail-item ${nameOfClass}`} onClick={(e) => handleClick(e, trail.id)}>
        <div>
          <img className={`trail-image ${nameOfClass}`} alt="cover" src={trail.cover.img_src} />
        </div>
        <div className={`trail-text ${nameOfClass}`}>
          <p id="trail-diff-review">
          {trail.difficulty} • <i class="fa-solid fa-star fa-xs"/> {Number(trail.avg_rating).toFixed(1)}({trail.num_reviews})
          </p>
          <p id={`trail-name`}>{trail.name}</p>
          <p id={`trail-park`}>{trail.park}</p>
          <p id={`trail-len`}>{trail.len}</p>
        </div>
        {user && (
          <div className="bookmark-icon">
            <ModalButton type="bookmark" modalComponent={<List trailId={trail.id} />} />
          </div>
        )}
      </div>
    </>
  );
}

export default TrailItem;
