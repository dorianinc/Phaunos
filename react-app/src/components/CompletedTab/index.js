import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserBookmarksThunk, updateBookmarksThunk } from "../../store/bookmarks";
import "./CheckmarkTab.css";

function CompletedTab({ trailId }) {
  const dispatch = useDispatch();

  const getBookmarks = useSelector((state) => state.bookmarks);
  const bookmarks = Object.values(getBookmarks);
  const currentBookmark = bookmarks.filter((bookmark) => bookmark.trail_id === trailId)[0];

  useEffect(() => {
    dispatch(getUserBookmarksThunk());
  }, [dispatch]);

  const handleClick = (e, bookmarkId) => {
    e.stopPropagation();
    console.log("bookmarkId 👉", bookmarkId);
    dispatch(updateBookmarksThunk(bookmarkId));
  };

  return (
    <>
      {currentBookmark && currentBookmark.completed ? (
        <div className="checkmark-icon-container">
          <img
            alt="completed"
            src="/images/checkmarks/greencheck.png"
            onClick={(e) => handleClick(e, currentBookmark.id)}
          />
          <p id="checkmark-status-text">Completed</p>
        </div>
      ) : (
        <div className="checkmark-icon-container">
          <img
            alt="not-completed"
            src="/images/checkmarks/greycheck.png"
            onClick={(e) => handleClick(e, currentBookmark.id)}
          />
        </div>
      )}
    </>
  );
}

export default CompletedTab;
