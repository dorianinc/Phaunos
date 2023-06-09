import { updateTrailThunk } from "./trails";

////////////// Action Creators ///////////////
export const GET_REVIEWS = "reviews/GET_REVIEWS";
///////////// Action Creators ///////////////

// get all reviews
export const getReviews = (reviews) => ({
  type: GET_REVIEWS,
  reviews,
});

/////////////////// Thunks ///////////////////

// get reviews of single trail
export const getReviewsThunk = (trailId) => async (dispatch) => {
  console.log("👉 GETTING REVIEWS IN THUNK!!!!")
  const res = await fetch(`/api/trails/${trailId}/reviews`);
  console.log("$$$$$ BEFORE RES OKAY CHECK $$$$$$$$")
  if (res.ok) {
    console.log("@@@@ RES WAS OKAY @@@@@")
    const data = await res.json();
    console.log("data 👉", data)
    console.log("data in reviews thunk 👉", data)
    dispatch(getReviews(data));
    return data;
  }else{
    console.log("---was in thunk but something went wrong-----")
  }
};

// add review to a trail
export const addReviewThunk = (trailId, review) => async (dispatch) => {
  const res = await fetch(`/api/trails/${trailId}/reviews`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(review),
  });
  if (res.ok) {
    const data = await res.json();
    await dispatch(updateTrailThunk(trailId));
    dispatch(getReviewsThunk(trailId));
    return data;
  } else if (res.status < 500) {
    const data = await res.json();
    if (data.errors) {
      return data;
    }
  }
};

// update review of a trail
export const updateReviewThunk = (trailId, review) => async (dispatch) => {
  const res = await fetch(`/api/reviews`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(review),
  });
  if (res.ok) {
    const data = await res.json();
    await dispatch(updateTrailThunk(trailId));
    dispatch(getReviewsThunk(trailId));
    return data;
  } else if (res.status < 500) {
    const data = await res.json();
    if (data.errors) {
      return data;
    }
  }
};

// delete review of a trail
export const deleteReviewThunk = (reviewId, trailId) => async (dispatch) => {
  const res = await fetch(`/api/reviews`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(reviewId),
  });
  if (res.ok) {
    const data = await res.json();
    await dispatch(updateTrailThunk(trailId));
    dispatch(getReviewsThunk(trailId));
    return data;
  }
};

const reviewsReducer = (state = {}, action) => {
  let newState;
  switch (action.type) {
    case GET_REVIEWS:
      newState = {};
      action.reviews.forEach((review) => {
        newState[review.id] = review;
      });
      console.log("newState  in reviews reducer 👉", newState)
      return newState;
    default:
      return state;
  }
};

export default reviewsReducer;
