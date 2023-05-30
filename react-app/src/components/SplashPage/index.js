import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTrailsThunk } from "../../store/trails";
import Banner from "./Banner/Banner";
import TrailItem from "../Trails/TrailItem";
import "./SplashPage.css";

function SplashPage() {
  const dispatch = useDispatch();
  const getTrails = useSelector((state) => state.trails);
  const trails = Object.values(getTrails);
  const topTrails = trails.sort((a, b) => a.avg_rating - b.avg_rating);



  useEffect(() => {
    dispatch(getTrailsThunk());
  }, [dispatch]);
  
  if (!topTrails.length) return null;

  const handleSlider = (direction) => {
    const trailContainer = document.querySelector(".trail-item-container");
    // let containerDimensions = trailContainer.getBoundingClientRect();
    // let containerWidth = containerDimensions.width;
    // console.log("containerWidth 👉", containerWidth)
    if (direction === "back") {
      trailContainer.scrollLeft -= 1095;
    } else {
      trailContainer.scrollLeft += 1095;
    }
  };


  return (
    <>
      <Banner />
      <div className="content-container">
        <div className="content-trails">
          <h1 className="local-favorites">Popular Trails</h1>
          <button className="prev-button" onClick={() => handleSlider("back")}>
            <i class="fa-solid fa-chevron-left fa-2xl" />
          </button>
          <button className="next-button" onClick={() => handleSlider("forward")}>
            <i class="fa-solid fa-chevron-right fa-2xl" />
          </button>
          <div className="trail-item-container">
            {(() => {
              let topTen = [];
              for (let i = 0; i < 10; i++) {
                const trail = topTrails[i];
                topTen.push(<TrailItem key={i} trail={trail} nameOfClass="splash" />);
              }
              return topTen;
            })()}
          </div>
        </div>
      </div>
    </>
  );
}

export default SplashPage;
