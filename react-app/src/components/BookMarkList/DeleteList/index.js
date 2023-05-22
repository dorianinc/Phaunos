import { useDispatch } from "react-redux";
import { useModal } from "../../../context/Modal";
import { deleteListThunk } from "../../../store/lists";
import "./DeleteList.css";

function DeleteList({ listId }) {
  const dispatch = useDispatch();
  const { closeModal } = useModal();

  const handleDelete = async (e) => {
    e.preventDefault();
    await dispatch(deleteListThunk({ listId }));
    closeModal();
  };

  return (
    <div className="delete-list">
      <h1>Delete list</h1>
      <p id="delete-text"> Are you sure you want to delete this list?</p>
      <div className="buttons delete">
        <div>
          <button className="green-button delete" onClick={closeModal}>
            {" "}
            Cancel{" "}
          </button>
        </div>
        <div>
          <button className="white-button delete" onClick={(e) => handleDelete(e)}>
            Yes, delete this list
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteList;
