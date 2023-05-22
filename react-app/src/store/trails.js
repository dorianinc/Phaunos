////////////// Action Creators ///////////////
export const GET_TRAILS = "trails/GET_TRAILS";
export const GET_SINGLE_TRAIL = "trails/GET_SINGLE_TRAIL";
// export const UPDATE_TRAIL = "trails/UPDATE_TRAIL";
// export const DELETE_TRAIL = "trails/DELETE_TRAIL";
// export const CLEAR_TRAILS = "trails/CLEAR_TRAILS";

///////////// Action Creators ///////////////

// get all trails
export const getTrails = (trails) => ({
  type: GET_TRAILS,
  trails,
});
// get single trail
export const getSingleTrail = (trail) => ({
  type: GET_SINGLE_TRAIL,
  trail,
});

// // update single trail
// export const updateTrail = (trail) => ({
//   type: UPDATE_TRAIL,
//   trail,
// });

// //// delete single trail
// export const deleteTrail = (trailId) => ({
//   type: DELETE_TRAIL,
//   trailId,
// });

// // clear trails state
// export const clearTrails = () => ({
//   type: CLEAR_TRAILS,
// });

/////////////////// Thunks ///////////////////

// get all trails
export const getTrailsThunk = () => async (dispatch) => {
  const res = await fetch("/api/trails");
  if (res.ok) {
    const data = await res.json();
    await dispatch(getTrails(data));
    return data;
  }
};

// // get user's trails
// export const getUserTrailsThunk = () => async (dispatch) => {
//   const res = await fetch("/api/trails/current");
//   if (res.ok) {
//     const data = await res.json();
//     dispatch(getTrails(data));
//     return data
//   }
// };

// get trail details of single trail
export const getSingleTrailThunk = (trailId) => async (dispatch) => {
  const res = await fetch(`/api/trails/${trailId}`);
  if (res.ok) {
    const data = await res.json();
    await dispatch(getSingleTrail(data));
    return data;
  }
};

// add review to a trail
export const addTrailReviewThunk = (trailId, review) => async (dispatch) => {
  const res = await fetch(`/api/trails/${trailId}/reviews`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(review),
  });
  if (res.ok) {
    const data = await res.json();
    await dispatch(getSingleTrailThunk(trailId));
    return data;
  }
};

// // update a trail
// export const updateTrailThunk = (trail, trailEdits) => async (dispatch) => {
//   const res = await fetch(`/api/trails/${trail.id}`, {
//     method: "PUT",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(trailEdits),
//   });
//   if (res.ok) {
//     const data = await res.json();
//     return data;
//   }
// };

// // delete a trail
// export const deleteTrailThunk = (trailId) => async (dispatch) => {
//   const res = await fetch(`/api/trails/${trailId}`, {
//     method: "DELETE",
//   });
//   if (res.ok) {
//     dispatch(getUserTrailsThunk());
//   }
// };

// export const addSongTrail = (trail) => async(dispatch) => {
//   const trailId = trail.trail_id
//   // const history = useHistory()
//   const response = await fetch(`/api/trails/${trailId}/song`,{
//       method:"POST",
//       headers: {
//         "Content-Type": 'application/json'
//       },
//     body: JSON.stringify(trail)
//   })
//   if (response.ok){
//   }
// }
const trailsReducer = (state = {}, action) => {
  let newState;
  switch (action.type) {
    case GET_TRAILS:
      newState = {};
      action.trails.forEach((trail) => {
        newState[trail.id] = trail;
      });
      return newState;
    case GET_SINGLE_TRAIL:
      newState = {};
      newState = { ...action.trail };
      return newState;
    // case CLEAR_TRAILS:
    //   return {};
    default:
      return state;
  }
};

export default trailsReducer;
