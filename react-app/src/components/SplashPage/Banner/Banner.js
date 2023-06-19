// import { Link } from "react-router-dom";
import "./Banner.css";

const Banner = () => {
  const handleClick = (e) => {
    e.preventDefault();
    alert("feature coming soon");
  };
  return (
    <>
      <div className="centerpiece">
        <img className="splash-image" alt="hiker-hills" src="/images/backgrounds/splash-page.jpg" />
        <div className="centerpiece-content">
          <h1>Find your outdoors</h1>
          <span className="search-bar">
            <div id="search-button">
              <i className="fa-solid fa-magnifying-glass fa-xl" />
              <input
                id="search-input"
                type="search"
                name="trail-search"
                placeholder="Search by city, park, or trail name"
              />
              <div onClick={(e) => handleClick(e)}>
                <i className="fa-solid fa-circle-arrow-right fa-2xl" />
              </div>
            </div>
          </span>
          <p id="explorer-tag">{/* <Link>Explore nearby trails</Link> */}</p>
        </div>
      </div>
    </>
  );
};

export default Banner;
