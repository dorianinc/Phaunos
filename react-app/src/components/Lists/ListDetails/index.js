import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSingleListThunk, editListThunk } from "../../../store/lists";
import { useParams, useHistory } from "react-router-dom";
import TrailItem from "../../Trails/TrailItem";
import Map from "../../Map";
import "./ListDetails.css";

function ListDetails() {
  const { listId } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();
  const [title, setTitle] = useState("");
  const [edit, setEdit] = useState(false);

  const list = useSelector((state) => state.lists);

  const handleKeyDown = async (e, listId) => {
    e.stopPropagation();
    if (e.key === "Enter") {
      if (title !== list.title) {
        await dispatch(editListThunk({ title, listId }));
        dispatch(getSingleListThunk(listId));
      }
      setEdit(false);
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
    } else {
      setTitle(list.title);
      setEdit(true);
    }
  };

  const handleClick = (e) => {
    history.push("/")
  }

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
            {bookmarks.length
              ? bookmarks.map((bookmark, i) => (
                  <TrailItem
                    key={i}
                    trail={bookmark.trail}
                    nameOfClass="bookmark"
                    editing={edit}
                    bookmarkId={bookmark.id}
                    listId={listId}
                  />
                ))
              : <div className="no-bookmarks">
                <img alt="backpack-icon" id="backpack" src="/images/icons/backpack.png"/>
                  <h2 className="primary-color">Start Saving Trails</h2>
                  <p className="secondary-color" style={{fontWeight: "500"}}>Tap the bookmark icon on any trail to turn this into your adventure wishlist</p>
                  <button 
                  className="green-button" 
                  id="explorer-trails-button"
                  onClick={(e) => handleClick(e)}
                  >Explorer Trails</button>
                </div>}
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
