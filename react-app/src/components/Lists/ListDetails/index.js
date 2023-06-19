import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSingleListThunk, editListThunk } from "../../../store/lists";
import { useParams } from "react-router-dom";
import TrailItem from "../../Trails/TrailItem";
import Map from "../../Map";
import "./ListDetails.css";

function ListDetails() {
  const { listId } = useParams();
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [edit, setEdit] = useState(false);
  const [focus, setFocus] = useState(false);

  const list = useSelector((state) => state.lists);

  const handleKeyDown = async (e, listId) => {
    e.stopPropagation();
    if (e.key === "Enter") {
      if (title !== list.title) {
        await dispatch(editListThunk({ title, listId }));
        dispatch(getSingleListThunk(listId));
      }
      setEdit(false);
      setFocus(false);
    }
  };

  const handleEdit = async (e, listId) => {
    e.stopPropagation();
    if (edit === true) {
      if (title !== list.title) {
        await dispatch(editListThunk({ title, listId }));
        dispatch(getSingleListThunk(listId));
      }
      setEdit(false);
      setFocus(false);
    } else {
      setTitle(list.title);
      setEdit(true);
      setFocus(true);
    }
  };

  useEffect(() => {
    dispatch(getSingleListThunk(listId));
  }, [dispatch, listId]);

  if (!list.id) return null;
  const bookmarks = list.bookmarks;

  return (
    <div className="list-details-container">
      <div className="list-details-content">
        <div className="list-details-content-left">
          <div className="list-details-list-title">
            <h1 id="list-details-title">
              {edit === true && list.title !== "My Favorites" ? (
                <input
                  style={{ width: "auto" }}
                  value={title}
                  onClick={(e) => e.stopPropagation()}
                  onKeyDown={(e) => handleKeyDown(e, list.id)}
                  onChange={(e) => setTitle(e.target.value)}
                />
              ) : (
                <>{list.title}</>
              )}
            </h1>
            <div className="list-details-ptags">
              <p id="list-details-len">
                {list.len} {list.len === 1 ? "bookmark" : "bookmarks"}
              </p>
              <p className="list-details-edit" onClick={(e) => handleEdit(e, list.id)}>
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
