import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserListsThunk } from "../../store/lists";
import ModalButton from "../ModalButton";
import NewList from "../Lists/NewList";
import ListItem from "../Lists/ListItem";
import "./ProfilePage.css";

const ProfilePage = () => {
  const [hidden, setHidden] = useState("hidden");
  const user = useSelector((state) => state.session.user);
  console.log("user 👉", user)
  const getLists = useSelector((state) => state.lists);
  const lists = Object.values(getLists);

  const dispatch = useDispatch();

  useEffect(() => {
    document.body.style.backgroundColor = "#efefec";
    return () => {
      document.body.style.backgroundColor = "#fff";
    };
  });

  useEffect(() => {
    dispatch(getUserListsThunk());
  }, [dispatch]);

  return (
    <div className="profile-container">
      <div className="profile-info">
        <div className="profile-pic-container">
          <img
            className="profile-pic profile"
            alt="profile-pic"
            src={user.profile_pic ? user.profile_pic : user.default_pic}
            onMouseEnter={() => setHidden("")}
          />
          <div className={`image-overlay ${hidden}`} onMouseLeave={() => setHidden("hidden")}>
          edit
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
      <div className="profile-user-lists">
        <h1 id="profile-list-header">Lists</h1>
        <ModalButton
          modalComponent={<NewList />}
          buttonContent={
            <div className="create-list">
              <img className="plus-sign" alt="add" src="/images/icons/plus.png" />
              <p>Create New List</p>
            </div>
          }
        />
        <hr className="header-divider" />
        <div className="list-container profile">
          {lists.map((list, i) => (
            <ListItem key={i} list={list} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;