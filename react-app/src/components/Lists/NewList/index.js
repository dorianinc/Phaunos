import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { createListThunk } from "../../../store/lists";
import List from "..";
import ModalButton from "../../ModalButton";
import "./NewList.css";

function NewList({ trail }) {
  const [title, setTitle] = useState("");
  const [buttonClass, setButtonClass] = useState("green-button disabled");

  const dispatch = useDispatch();
  const location = useLocation();
  const pathName = location.pathname;

  useEffect(() => {
    if (title.length >= 5 && title.length <= 15) {
      setButtonClass("green-button");
    } else {
      setButtonClass("green-button disabled");
    }
  }, [title]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newList = { title };
    await dispatch(createListThunk(newList));
  };

  return (
    <>
      <div className="new-list-container">
        <ModalButton
          modalComponent={pathName === "/profile" ? null : <List trail={trail} />}
          buttonContent={
            <div className="back-arrow">
              <i className="fa-solid fa-arrow-left fa-xl" />
            </div>
          }
        />
        <h1>Create new list</h1>
        <form className="new-list-form">
          <label style={{ fontSize: "20px" }}>
            List Name
            <br />
            <input id="new-list-input" value={title} onChange={(e) => setTitle(e.target.value)} />
          </label>
          <hr className="header-divider" />
          <div className="buttons">
            <ModalButton
              modalComponent={pathName === "/profile" ? null : <List trail={trail} />}
              buttonContent={
                <>
                  <button className="white-button">Cancel</button>
                  <button
                    className={buttonClass}
                    onClick={handleSubmit}
                    disabled={buttonClass.includes("disabled")}
                  >
                    Create
                  </button>
                </>
              }
            />
          </div>
        </form>
      </div>
    </>
  );
}

export default NewList;
