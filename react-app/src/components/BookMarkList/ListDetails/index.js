import { useEffect } from "react";
// import { useModal } from "../../context/Modal";
import { useDispatch, useSelector } from "react-redux";
import { getSingleListThunk } from "../../../store/lists";
// import ModalButton from "../ModalButton";
import { useParams } from "react-router-dom";
import "./ListDetails.css";

function ListDetails() {
  const { listId } = useParams();
  const dispatch = useDispatch();
  const list = useSelector((state) => state.lists);

  useEffect(() => {
    dispatch(getSingleListThunk(listId));
  }, [dispatch, listId]);

  if (!list.id) return null;
  return (
    <div className="list-details-container">
      <div className="list-details-query-bar">searchbar and query options go here</div>
      <div className="list-details-content">
        <div className="list-details-content-left">
          <div className="list-details-list-title">
            <h1 id="list-details-title">{list.title}</h1>
          </div>
          <div className="list-details-bookmarks">bookmarks go here</div>
        </div>
        <div className="list-details-content-right">map goes here</div>
      </div>
    </div>
  );
}

export default ListDetails;
