import React from "react";

function UploadImageModal(props) {
  return (
    <div className="modal">
      add new friends module
      <div className="upload-container">
        <div className="header">
          <span>
            Update Profile Picture
          </span>
          <div className="close-btn" onClick={props.close}>x</div>
        </div>
        <div className="upload-section">
          <div className="upload-btn">+ Upload Photo</div>
        </div>
      </div>
    </div>
  )
}

export default UploadImageModal;