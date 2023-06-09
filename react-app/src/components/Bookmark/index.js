import { useEffect } from "react";
import { useModal } from "../../context/Modal";
import { useDispatch, useSelector } from "react-redux";
import { getUserListsThunk } from "../../store/lists";
import ListItem from "../Lists/ListItem";
import NewList from "../Lists/NewList";
import ModalButton from "../ModalButton";
import "./BookmarkList.css";

function BookmarkList({ trail }) {
  const { closeModal } = useModal();

  const getLists = useSelector((state) => state.lists);
  const lists = Object.values(getLists);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserListsThunk());
  }, [dispatch]);

  return (
    <div className="bookmark-list-modal">
      <img className="x-mark" alt="close" onClick={closeModal} src="/images/icons/mark.png" />
      <h1 className="primary-color">Save to list</h1>
      <h2 className="secondary-color">{trail.name}</h2>
      <hr className="header-divider" />
      <ModalButton
        modalComponent={<NewList trail={trail} />}
        buttonContent={
          <div className="create-list">
            <img className="plus-sign" alt="add" src="/images/icons/plus.png" />
            <p>Create New List</p>
          </div>
        }
      />
      <hr className="item-divider" />
      <div className="bookmark-list-container modal">
        {lists.map((list, i) => (
          <ListItem key={i} trailId={trail.id} list={list} />
        ))}
      </div>
      <div className="buttons">
        <button id="done-button" className="green-button" onClick={closeModal}>
          Done
        </button>
      </div>
    </div>
  );
}

export default BookmarkList;
