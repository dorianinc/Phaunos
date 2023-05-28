import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSingleListThunk } from "../../../store/lists";
import { useParams } from "react-router-dom";
import TrailItem from "../../Trails/TrailItem";
import Map from "../../Map";
import "./ListDetails.css";

function ListDetails() {
  const [edit, setEdit] = useState(false);
  const { listId } = useParams();
  const dispatch = useDispatch();
  const list = useSelector((state) => state.lists);

  useEffect(() => {
    dispatch(getSingleListThunk(listId));
  }, [dispatch, listId]);

  if (!list.id) return null;
  const bookmarks = list.bookmarks;
  console.log("bookmarks from list details 👉", bookmarks);

  return (
    <div className="list-details-container">
      <div className="list-details-content">
        <div className="list-details-content-left">
          <div className="list-details-list-title">
            <h1 id="list-details-title">{list.title}</h1>
            <div className="list-details-ptags">
              <p id="list-details-len">
                {list.len} {list.len === 1 ? "bookmark" : "bookmarks"}
              </p>
              <p className="list-details-edit" value={edit} onClick={() => setEdit(!edit)}>
                edit list
              </p>
            </div>
          </div>
          <div className="list-details-bookmarks">
            {bookmarks.map((bookmark, i) => (
              <TrailItem
                key={i}
                trail={bookmark.trail}
                nameOfClass="bookmark"
                editing={edit}
                bookmarkId={bookmark.id}
                listId={listId}
              />
            ))}
          </div>
        </div>
        <div className="list-details-content-right">
          <Map bookmarks={bookmarks} />
        </div>
      </div>
    </div>
  );
}

export default ListDetails;
