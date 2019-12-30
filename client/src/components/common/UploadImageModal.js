import React from "react";
import ProfileImageUpload from './ProfileImageUpload'
import ItemUpload from './ItemUpload'

function UploadImageModal(props) {
  return (
    <div className="modal">
      <div className="modal-container upload">
        <div className="header">
          <span>
            Update Profile Picture
          </span>
          <div className="close-btn" onClick={props.close}>x</div>
        </div>
        <div className="upload-section">
          {
            props.options.type === 'avatar' || props.options.type === 'coverPhoto' ? (
              <ProfileImageUpload options={props.options}/>
            ) : (
              <ItemUpload/>
            )
          }
        </div>
      </div>
    </div>
  )
}

export default UploadImageModal;

