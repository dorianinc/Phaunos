import { useHistory, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { deleteBookmarkThunk } from "../../../store/lists";
import ModalButton from "../../ModalButton";
import List from "../../Lists";
import "./TrailItem.css";

function TrailItem({ trail, bookmarkId, listId, nameOfClass, editing }) {
  const history = useHistory();
  const location = useLocation();
  const dispatch = useDispatch();
  const pathName = location.pathname;

  const user = useSelector((state) => state.session.user);

  const handleClick = (e, trailId) => {
    e.preventDefault();
    history.push(`/trails/${trailId}`);
  };

  const handleDelete = async (e, bookmarkId) => {
    e.stopPropagation()
    dispatch(deleteBookmarkThunk({bookmarkId}, listId))
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
            {trail.difficulty} • <i class="fa-solid fa-star fa-xs" />{" "}
            {Number(trail.avg_rating).toFixed(1)}({trail.num_reviews})
          </p>
          <p id={`trail-name`}>{trail.name}</p>
          <p id={`trail-park`}>{trail.park}</p>
          <p id={`trail-len`}>{trail.len}</p>
        </div>
        {user && !pathName.startsWith('/list') ? (
          <div className="bookmark-icon cards">
            <ModalButton type="bookmark" modalComponent={<List trail={trail} />} />
          </div>
        ) : editing ? (
          <>
          <div className="item-overlay"/>
          <div className="trash-icon" onClick={(e) => handleDelete(e, bookmarkId)}>
            <i class="fa-regular fa-trash-can trail"/>
          </div>
          </>
        ) : null}
      </div>
    </>
  );
}

export default TrailItem;
