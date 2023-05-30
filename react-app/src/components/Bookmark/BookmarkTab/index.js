import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../../context/Modal";
import { getUserBookmarksThunk } from "../../../store/bookmarks";

function BookmarkTab({ trailId, bookmarkedTrailId, modalComponent }) {
  const { setModalContent } = useModal();

  const getBookmarks = useSelector((state) => state.bookmarks);
  const bookmarks = Object.values(getBookmarks);
  const isBookmarked = () => {
    if (bookmarks) {
      return !!bookmarks.filter((bookmark) => bookmark.trail_id === trailId).length;
    }
  };

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserBookmarksThunk());
  }, [dispatch]);

  const handleClick = (e) => {
    e.stopPropagation();
    setModalContent(modalComponent);
  };

  return (
    <>
      {isBookmarked() ? (
        <img alt="bookmarked" src="/images/bookmarks/greenmark.png" onClick={(e) => handleClick(e)} />
      ) : (
        <img alt="not-bookmarked" src="/images/bookmarks/bookmark.png" onClick={(e) => handleClick(e)} />
      )}
    </>
  );
}

export default BookmarkTab;
