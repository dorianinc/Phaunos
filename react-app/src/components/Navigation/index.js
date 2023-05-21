import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import LogoButton from "./LogoButton";
import "./Navigation.css";

function Navigation({ isLoaded }) {
  const sessionUser = useSelector((state) => state.session.user);

  return (
    <div className="nav-container">
      <div className="nav">
        <div className="nav-left">
          <Link exact to="/">
            <LogoButton />
          </Link>
          {/* <Link exact to="/explorer">
          Explore
        </Link>
        <Link exact to="/">
          Community
        </Link> */}
          <Link exact to="/profile">
            Saved
          </Link>
          {/* <Link exact to="/">
          Shop
        </Link> */}
        </div>
        <div className="nav-right">{isLoaded && <ProfileButton user={sessionUser} />}</div>
      </div>
    </div>
  );
}

export default Navigation;
