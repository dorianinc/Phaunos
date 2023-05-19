import { Link } from "react-router-dom";
import "./Banner.css";

function Banner() {
  return (
    <>
      <div className="centerpiece">
        <img
          className="splash-image"
          alt="hiker-hills"
          src="https://www.cbisland.com/content/uploads/2022/09/outdoor-adventure-31-1920x750.jpg"
        />
        <div className="centerpiece-content">
          <h1>Find your outdoors</h1>
          <span className="search-bar">
          <button id="search-button">
          <i class="fa-solid fa-magnifying-glass fa-xl"/>
            <input
              id="search-input"
              type="search"
              name="trail-search"
              placeholder="Search by city, park, or trail name"
            />
            <i class="fa-solid fa-circle-arrow-right fa-2xl"></i>
          </button>
          </span>
          <p id="explorer-tag">
          <Link>Explore nearby trails</Link>
          </p>
        </div>
      </div>
    </>
  );
}

export default Banner;
