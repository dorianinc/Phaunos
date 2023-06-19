import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserListsThunk } from "../../store/lists";
import { deleteProfilePicThunk } from "../../store/session";
import ModalButton from "../ModalButton";
import DropZone from "../DropZone";
import "./ProfilePage.css";
import { useLocation, useHistory } from "react-router-dom";
import Feed from "./Feed";
import Lists from "./Lists";

const ProfilePage = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const history = useHistory();
  const [hovered, setHovered] = useState(false);
  const [selected, setSelected] = useState(false);
  const user = useSelector((state) => state.session.user);
  const tab = location.pathname.split("/")[2];

  useEffect(() => {
    document.body.style.backgroundColor = "#efefec";
    return () => {
      document.body.style.backgroundColor = "#fff";
    };
  });

  useEffect(() => {
    dispatch(getUserListsThunk());
  }, [dispatch]);

  const handleDelete = (e) => {
    e.preventDefault();
    dispatch(deleteProfilePicThunk());
    setSelected(false);
  };

  const handleToggle = () => {
    setSelected((current) => !current);
  };

  const goToTab = (e, tab) => {
    e.preventDefault();
    history.push(`/profile/${tab}`);
  };

  return (
    <div className="profile-container">
      <div className="profile-info">
        <div onMouseLeave={() => setSelected(false)}>
          <div className="profile-pic-container profile tooltip">
            <img
              className="profile-pic profile"
              alt="profile-pic"
              src={user.profile_pic ? user.profile_pic : user.default_pic}
              onClick={handleToggle}
              onMouseEnter={() => setHovered(true)}
              onMouseLeave={() => setHovered(false)}
            />
            <div className={`tooltip-content ${hovered || selected ? "" : "hidden"}`}>
              {!user.profile_pic ? (
                <ModalButton
                  modalComponent={<DropZone selected={setSelected} />}
                  buttonContent={<p className="image-options">Edit</p>}
                />
              ) : (
                <p className="image-options" onClick={(e) => handleDelete(e)}>
                  Delete
                </p>
              )}
            </div>
          </div>
        </div>
        <h1 id="profile-user-name">
          {user.first_name} {user.last_name}
        </h1>
        <p id="profile-user-location">City, State</p>
        <p id="profile-user-member">Member since May 2023</p>
        <div className="follows">
          <div>
            <p>0</p>
            <p id="followers">Followers</p>
          </div>
          <div>
            <p>0</p>
            <p id="following">Following</p>
          </div>
        </div>
      </div>
      <div className="profile-user-tabs-container">
        <div>
          <div className="profile-user-tabs-options">
            <p
              className="primary-color tab-option"
              style={{ textDecoration: tab === "feed" ? "underline" : "" }}
              onClick={(e) => goToTab(e, "feed")}
            >
              Feed
            </p>
            <p
              className="primary-color tab-option"
              style={{ textDecoration: tab === "lists" ? "underline" : "" }}
              onClick={(e) => goToTab(e, "lists")}
            >
              Lists
            </p>
          </div>
          <hr className="header-divider" />
        </div>
        {tab === "feed" ? <Feed /> : tab === "lists" ? <Lists /> : <Feed />}
      </div>
    </div>
  );
};

export default ProfilePage;
