////////////// Action Creators ///////////////
export const GET_BOOKMARKS = "bookmarks/GET_BOOKMARKS";

///////////// Action Creators ///////////////
// get all bookmarks
export const getBookmarks = (bookmarks) => ({
  type: GET_BOOKMARKS,
  bookmarks,
});

/////////////////// Thunks ///////////////////
// get all users bookmarks
export const getUserBookmarksThunk = () => async (dispatch) => {
  const res = await fetch("/api/bookmarks");
  if (res.ok) {
    const data = await res.json();
    dispatch(getBookmarks(data));
    return data;
  }
};

const bookmarksReducer = (state = {}, action) => {
  let newState;
  switch (action.type) {
    case GET_BOOKMARKS:
      newState = {};
      action.bookmarks.forEach((bookmark) => {
        newState[bookmark.id] = bookmark;
      });
      return newState;
    default:
      return state;
  }
};

export default bookmarksReducer;
