import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserListsThunk } from "../../store/lists";
import ModalButton from "../ModalButton";
import NewList from "../BookMarkList/NewList";
import BookmarkItem from "../BookMarkList/BookmarkItem";
import "./ProfilePage.css";

const UserProfile = () => {
  const user = useSelector((state) => state.session.user);
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
      <div className="user-info">
        <div>
          <img className="profile-pic" alt="profile-pic" src="/images/animal-icons/turtle.png" />
        </div>
        <h2 id="user-name">
          {user.first_name} {user.last_name}
        </h2>
        <p id="user-location">City, State</p>
        <p id="user-member">Member since May 2023</p>
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
      <div className="user-lists">
        <h1 id="list-header">Lists</h1>
        <ModalButton
          modalComponent={<NewList />}
          buttonContent={
            <div className="create-list">
              <img className="plus-sign" alt="add" src="/images/plus.png" />
              <p>Create New List</p>
            </div>
          }
        />
        <hr className="header-divider" />
        <div className="list-container profile">
          {lists.map((list) => (
            <BookmarkItem list={list} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
