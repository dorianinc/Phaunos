import { getSingleTrailThunk } from "./trails";


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
      await dispatch(getSingleTrailThunk(trailId));
      return data;
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
      await dispatch(getSingleTrailThunk(trailId));
      return data;
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
      await dispatch(getSingleTrailThunk(trailId));
      return data;
    }
  };