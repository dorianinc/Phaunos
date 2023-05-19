import React from "react";
import { useModal } from "../../../context/Modal";

function OpenModal({
  type,
  modalComponent, // component to render inside the modal
  buttonText, // text of the button that opens the modal
  onButtonClick, // optional: callback function that will be called once the button that opens the modal is clicked
  onModalClose, // optional: callback function that will be called once the modal is closed
}) {
  const { setModalContent, setOnModalClose } = useModal();

  const handleClick = (e) => {
    e.stopPropagation();
    if (onModalClose) setOnModalClose(onModalClose);
    setModalContent(modalComponent);
    if (onButtonClick) onButtonClick();
  };
  return (
    <>
      {type === "bookmark" ? (
        <i className="fa-regular fa-bookmark fa-xl" onClick={handleClick} />
      ) : (
        <button onClick={(e) => handleClick(e)}>{buttonText}</button>
      )}
    </>
  );
}

export default OpenModal;
