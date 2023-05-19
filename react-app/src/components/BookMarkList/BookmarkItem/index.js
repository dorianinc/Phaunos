import { useHistory } from "react-router-dom";

function BookmarkItem({ bookmark }) {
  const history = useHistory();

  return (
    <>
      <div className="bookmark-item">
        <div className="bookmark-tab">
          <i className="fa-regular fa-bookmark fa-lg" />
        </div>
        <div className="bookmark-summary">
          <p>My Favorites</p>
          <p>0 items</p>
        </div>
        <div className="bookmark-checkbox">
          <input type="checkbox" />
        </div>
      </div>
      <hr />
    </>
  );
}

export default BookmarkItem;
