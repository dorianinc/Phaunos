////////////// Action Creators ///////////////
export const GET_LISTS = "lists/GET_LISTS";

///////////// Action Creators ///////////////

// get all lists
export const getLists = (lists) => ({
  type: GET_LISTS,
  lists,
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
  console.log("listId  in deleteListThunk 👉", listId);

  const res = await fetch("/api/bookmarksLists", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(listId),
  });
  if (res.ok) {
    
    console.log("👉 successfully Deleted!");
    dispatch(getUserListsThunk());
    return true
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
    default:
      return state;
  }
};

export default listsReducer;
