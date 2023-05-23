////////////// Action Creators ///////////////
export const GET_LISTS = "lists/GET_LISTS";
export const GET_SINGLE_LIST = "lists/GET_SINGLE_LIST";
///////////// Action Creators ///////////////

// get all lists
export const getLists = (lists) => ({
  type: GET_LISTS,
  lists,
});

// get single trail
export const getSingleList = (list) => ({
  type: GET_SINGLE_LIST,
  list,
});

/////////////////// Thunks ///////////////////

// get all users lists
export const getUserListsThunk = () => async (dispatch) => {
  const res = await fetch("/api/bookmarksLists");
  if (res.ok) {
    const data = await res.json();
    dispatch(getLists(data));
    return data;
  }
};

// get list details of single list
export const getSingleListThunk = (listId) => async (dispatch) => {
  const res = await fetch(`/api/bookmarksLists/${listId}`);
  if (res.ok) {
    const data = await res.json();
    dispatch(getSingleList(data));
    return data;
  }
};

// create a list
export const createListThunk = (list) => async (dispatch) => {
  const res = await fetch("/api/bookmarksLists", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(list),
  });
  if (res.ok) {
    const data = await res.json();
    await dispatch(getUserListsThunk());
    return data;
  }
};

// delete a list
export const deleteListThunk = (listId) => async (dispatch) => {

  const res = await fetch("/api/bookmarksLists", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(listId),
  });
  if (res.ok) {
    dispatch(getUserListsThunk());
  }
};

// change list title
export const editListThunk = (list) => async (dispatch) => {

  const res = await fetch("/api/bookmarksLists", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(list),
  });
  if (res.ok) {
    dispatch(getUserListsThunk());
  }
};

// add bookmark to list
export const addBookmarkThunk = (bookmark) => async (dispatch) => {
  const res = await fetch("/api/bookmarksLists/bookmark", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(bookmark),
  });
  if (res.ok) {
    const data = await res.json();
    await dispatch(getUserListsThunk());
    return data;
  }
};

const listsReducer = (state = {}, action) => {
  let newState;
  switch (action.type) {
    case GET_LISTS:
      newState = {};
      action.lists.forEach((list) => {
        newState[list.id] = list;
      });
      return newState;
    case GET_SINGLE_LIST:
      newState = {};
      newState = { ...action.list };
      return newState;
    default:
      return state;
  }
};

export default listsReducer;
