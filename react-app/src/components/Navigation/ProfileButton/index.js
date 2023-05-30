import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../../../store/session";

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (!ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const handleLogout = async (e) => {
    e.preventDefault();
    await dispatch(logout());
    closeMenu();
  };

  const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");
  const closeMenu = () => setShowMenu(false);

  return (
    <>
      {user ? (
        <button className="profile-button" onClick={openMenu}>
          <img className="profile-pic review" alt="profile-pic" src={user.profile_pic} />
        </button>
      ) : (
        <button id="login-button">
          <Link to="/login">Log in</Link>
        </button>
      )}
      <div className={`${ulClassName} primary-color`} ref={ulRef}>
        {user && (
          <div className="dropdown-options">
            <div className="dropdown-username">Hello, {user.first_name}</div>
            <div className="dropdown-email">{user.email}</div>
            <hr className="item-divider"/>
            <div className="dropdown-button" onClick={handleLogout}>
              Log Out
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default ProfileButton;
