import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUserListsThunk } from "../../../store/lists";
import ModalButton from "../../ModalButton";
import NewList from "../../Lists/NewList";
import ListItem from "../../Lists/ListItem";
import "./ProfileLists.css";

const Lists = () => {
  const { username } = useParams();
  console.log("username  👉", username )
  console.log("username  👉", username )
  const getLists = useSelector((state) => state.lists);
  const lists = Object.values(getLists);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserListsThunk());
  }, [dispatch]);

  return (
    <>
      {/* <h1 id="profile-list-header">Lists</h1> */}
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
    </>
  );
};

export default Lists;
