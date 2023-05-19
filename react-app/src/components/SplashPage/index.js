import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTrailsThunk } from "../../store/trails";
import { Link } from "react-router-dom";
import Banner from "./Banner/Banner";
import TrailItem from "../Trails/TrailItem";
import "./SplashPage.css";

function SplashPage() {
  const dispatch = useDispatch();
  const getTrails = useSelector((state) => state.trails);
  const trails = Object.values(getTrails);
  console.log("trails 👉", trails);

  useEffect(() => {
    dispatch(getTrailsThunk());
  }, [dispatch]);

  return (
    <>
      <Banner />
      <div className="content-container">
        <div className="content-trails">
          <h2>Local Favorites</h2>
          <div className="trail-item-container">
          {trails.map((trail) => (
            <TrailItem trail={trail}/>
          ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default SplashPage;
