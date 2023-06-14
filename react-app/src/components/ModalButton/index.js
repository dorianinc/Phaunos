import React from "react";
import { useModal } from "../../context/Modal";

function ModalButton({
  type,
  nameOfClass,
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
      <div className={nameOfClass} onClick={handleClick}>
        {buttonContent}
      </div>
    </>
  );
}

export default ModalButton;



<>
{isButton ? (
  <button onClick={handleClick} className="playlistButton">
    {isPlaying ? (
      <>
        <i className="fa fa-pause" aria-hidden="true" />
        Pause
      </>
    ) : (
      <>
        <i class="fa fa-play" aria-hidden="true" />
        Play
      </>
    )}
  </button>
) : (
  <p onClick={handleClick} className="play-pause-btn">
    {isPlaying && songId === queue[queueIndex].id ? (
      <i className="fa fa-pause" aria-hidden="true"></i>
    ) : (
      <i class="fa fa-play" aria-hidden="true"></i>
    )}
  </p>
)}
</>