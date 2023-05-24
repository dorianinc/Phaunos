import { useEffect } from "react";
// import { useModal } from "../../context/Modal";
import { useDispatch, useSelector } from "react-redux";
import { getSingleListThunk } from "../../../store/lists";
// import ModalButton from "../ModalButton";
import { useParams } from "react-router-dom";
import TrailItem from "../../Trails/TrailItem";
import "./ListDetails.css";

function ListDetails() {
  const { listId } = useParams();
  const dispatch = useDispatch();
  const list = useSelector((state) => state.lists);
  console.log("list from list detail 👉👉👉", list);

  useEffect(() => {
    dispatch(getSingleListThunk(listId));
  }, [dispatch, listId]);

  // console.log("listId 👉👉👉👉👉👉👉", listId);

  // console.log("👉👉👉👉👉👉👉 I AM RENDERING", !Object.values(list).length);
  if (!list.id) return null;
  const bookmarks = list.bookmarks;
  console.log("bookmarks from list detail 👉👉👉", bookmarks);

  return (
    <div className="list-details-container">
      <div className="list-details-query-bar">searchbar and query options go here</div>
      <div className="list-details-content">
        <div className="list-details-content-left">
          <div className="list-details-list-title">
            <h1 id="list-details-title">{list.title}</h1>
            <p id="list-details-len">
              {list.len} {list.len === 1 ? "bookmark" : "bookmarks"}
            </p>
          </div>
          <div className="list-details-bookmarks">
            {bookmarks.map((bookmark) => (
              <TrailItem trail={bookmark.trail} nameOfClass="bookmark" />
            ))}
          </div>
        </div>
        <div className="list-details-content-right">map goes here</div>
      </div>
    </div>
  );
}

export default ListDetails;
