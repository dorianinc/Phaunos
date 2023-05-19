import { useHistory } from "react-router-dom";
import OpenModal from "../../Modals/OpenModal";
import BookmarkTrailModal from "../../Modals/BookmarkTrailModal";
import "./TrailItem.css";

function TrailItem({ trail }) {
  const history = useHistory();

  const handleClick = (e, trailId) => {
    e.preventDefault();
    history.push(`/${trailId}`);
    alert("Nuggets in 5");
  };

  return (
    <>
      <div className="trail-item" onClick={(e) => handleClick(e, trail.id)}>
        <div>
          <img className="trail-image" src={trail.images[0].img_src} />
        </div>
        <div className="trail-text">
          <p className="trail-name">{trail.name}</p>
          <p className="trail-park">{trail.park}</p>
        </div>
        <div className="bookmark">
          <OpenModal
            buttonText="Delete"
            type="bookmark"
            modalComponent={<BookmarkTrailModal trailId={trail.id} />}
          />
        </div>
      </div>
    </>
  );
}

export default TrailItem;
