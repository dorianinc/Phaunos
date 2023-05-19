import "./TrailItem.css";
import { useHistory } from "react-router-dom";


function TrailItem({ trail }) {
  const history = useHistory()

  const handleClick = (e, val) => {
    e.preventDefault();
    e.stopPropagation()
    if(val === "bookmark") alert(val)
    else history.push(`/${val}`)
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
        <div className="bookmark" onClick={(e) => handleClick(e, "bookmark")}>
          <i className="fa-regular fa-bookmark fa-xl" />
        </div>
      </div>
    </>
  );
}

export default TrailItem;
