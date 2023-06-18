import { useEffect, useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { updateUserThunk, authenticate } from "../../store/session";
import "./DropZone.css";

const DropZone = ({ selected }) => {
  console.log("selected 👉", selected)
  const [errors, setErrors] = useState({});
  const [files, setFiles] = useState([]);
  const { closeModal } = useModal();
  const dispatch = useDispatch();
  selected(false);

  const onDrop = useCallback((acceptedFiles, rejectedFiles) => {
    setErrors({});
    if (acceptedFiles?.length) {
      setFiles((prev) => [
        ...prev,
        ...acceptedFiles.map((file) => Object.assign(file, { preview: URL.createObjectURL(file) })),
      ]);
    }
    console.log("accepted:", acceptedFiles);
    console.log(files);
    if (rejectedFiles[0].errors) {
      const dropzoneErrors = rejectedFiles[0].errors;
      const err = {};
      dropzoneErrors.forEach((error) => {
        if (error.code === "file-invalid-type")
          err.type = "The file must end in .png, .jpg , or .jpeg";
        if (error.code === "file-too-large") err.size = "The file is too large";
      });
      setErrors(err);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      image: [".png", ".jpg", ".jpeg"],
    },
    maxSize: 1024 * 1000,
  });

  const handleCancel = (e) => {
    e.preventDefault();
    setFiles([]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const image = files[0];
    const formData = new FormData();
    formData.append("profile_pic", image);
    const profilePic = await dispatch(updateUserThunk(formData));
    if (profilePic) closeModal();
  };

  return (
    <div className="drop-zone-modal">
      <img className="x-mark" alt="close" onClick={closeModal} src="/images/icons/mark.png" />
      <h1 className="primary-color">Upload Profile Picture</h1>
      <h1>{files.preview && "supfoo"}</h1>
      <hr className="header-divider" />
      <form className="drop-zone-form" onSubmit={(e) => handleSubmit(e)}>
        {files.length ? (
          <div className="drop-zone-preview-container">
            <img
              id="drop-zone-preview-image"
              alt="preview"
              src={files[0].preview}
              onLoad={() => {
                URL.revokeObjectURL(files[0].preview);
              }}
            />
          </div>
        ) : (
          <>
            <div {...getRootProps({ className: "drop-zone" })}>
              <input {...getInputProps()} />
              {isDragActive ? (
                <p className="drop-zone-text primary-color">Drop the files here ...</p>
              ) : (
                <>
                  <p className="drop-zone-text primary-color">
                    Drag photos here or click to select files
                  </p>
                  <p className="drop-zone-sub-text secondary-color">PNG, JPG or JPEG</p>
                </>
              )}
            </div>
          </>
        )}
        <p className="errors">{errors.type}</p>
        <p className="errors">{errors.size}</p>
        <div className="buttons">
          {files.length ? (
            <button className="white-button" onClick={(e) => handleCancel(e)}>
              Cancel
            </button>
          ) : null}
          <button
            type="submit"
            className={files.length ? "green-button" : "grey-button"}
            disabled={!files.length}
          >
            Upload
          </button>
        </div>
      </form>
    </div>
  );
};

export default DropZone;
