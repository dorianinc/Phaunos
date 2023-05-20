import { useDispatch } from "react-redux";
import { addBookmarkThunk } from "../../../store/lists";

function BookmarkItem({ list, trailId }) {
  const dispatch = useDispatch();

  const handleClick = async (e, listId) => {
    e.preventDefault();
    const newBookmark = {trailId, listId}
    dispatch(addBookmarkThunk(newBookmark))
  };

  if(!list) return null;
  return (
    <>
      <div className="bookmark-item">
        <div className="bookmark-tab">
          <i className="fa-regular fa-bookmark fa-lg" />
        </div>
        <div className="bookmark-summary">
          <p>{list.title}</p>
          <p>{list.length} items</p>
        </div>
        <div className="bookmark-checkbox">
          <input 
          onClick={(e) => handleClick(e, list.id)}
          type="checkbox"
           />
        </div>
      </div>
      <hr className="item-divider"/>
    </>
  );
}

export default BookmarkItem;
