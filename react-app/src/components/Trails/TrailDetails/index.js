import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getSingleTrailThunk } from "../../../store/trails";
import "./TrailDetails.css";

const TrailDetails = () => {
  const { trailId } = useParams();
  const dispatch = useDispatch();
  //   const user = useSelector((state) => state.session.user);
  const trail = useSelector((state) => state.trails);
  console.log("trail in trail details 👉👉👉", trail);

  useEffect(() => {
    document.body.style.backgroundColor = "#efefec";
    return () => {
      document.body.style.backgroundColor = "#fff";
    };
  });

  useEffect(() => {
    console.log("dispatching get single playlist");
    dispatch(getSingleTrailThunk(trailId));
  }, [dispatch, trailId]);

  if (!trail) return null
  return (
    <div className="trail-details-container">
      <h1>Trail Details Page</h1>
      <h2>{trail.name}</h2>
    </div>
  );
};

export default TrailDetails;
