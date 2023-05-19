
////////////// Action Creators ///////////////
export const GET_BOOKMARKS = "bookmarks/GET_BOOKMARKS";

///////////// Action Creators ///////////////

// get all bookmarks
export const getBookmarks = (bookmarks) => ({
  type: GET_BOOKMARKS,
  bookmarks,
});
/////////////////// Thunks ///////////////////

export const getUserBookmarksThunk = () => async (dispatch) => {
  const res = await fetch("/api/bookmarksList");
  if (res.ok) {
    const data = await res.json();
    console.log("getBookmarksThunk data 👉", data)
    dispatch(getUserBookmarksThunk(data));
    return data;
  }
};

const bookmarksReducer = (state = {}, action) => {
  let newState;
  switch (action.type) {
    case GET_BOOKMARKS:
      newState = {};
      console.log(" action.bookmarks 👉👉👉👉",  action.bookmarks)
      action.bookmarks.forEach((bookmark) => {
        newState[bookmark.id] = bookmark;
      });
      console.log(" new state 👉👉👉👉",  newState)
      return newState;
    default:
      return state;
  }
};

export default bookmarksReducer;