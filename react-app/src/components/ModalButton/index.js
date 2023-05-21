import React from "react";
import { useModal } from "../../context/Modal";

function ModalButton({
  type,
  modalComponent, // component to render inside the modal
  buttonContent,
  buttonText, // text of the button that opens the modal
  onButtonClick, // optional: callback function that will be called once the button that opens the modal is clicked
  onModalClose, // optional: callback function that will be called once the modal is closed
}) {
  const { setModalContent, setOnModalClose } = useModal();
  // const [buttonContent, setButtonContent] = useState(null)
  const handleClick = (e) => {
    e.stopPropagation();
    if (onModalClose) setOnModalClose(onModalClose);
    setModalContent(modalComponent);
    if (onButtonClick) onButtonClick();
  };

  return (
    <>
      {type === "bookmark" ? (
        <i className="fa-regular fa-bookmark fa-xl" onClick={(e) => handleClick(e)} />
      ) : (
        <div className="list-options" onClick={handleClick}>{buttonContent}</div>
      )}
    </>
  );
}

export default ModalButton;
