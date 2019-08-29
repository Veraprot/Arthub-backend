import React, {useState, useEffect} from "react";
import {setProfileImage} from '../../actions/profileActions'
import { connect } from 'react-redux'

function UploadImageModal(props) {
  const [image, setImage] = useState(null)
  const imageRef = React.createRef();

  const changeUploadFile = (e) => {
    setImage(URL.createObjectURL(e.target.files[0]))
    props.setProfileImage(props.currentUser._id, e.target.files[0])
  }

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
          <img src={image} alt=""/>
          <div className="upload-btn">
            {/* + Upload Photo */}
            <input type="file" accept="image/*, image/heic, image/heif" onChange={changeUploadFile} ref={imageRef}/>
          </div>
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = state => ({
  currentUser: state.auth.user, 
}); 
export default connect(mapStateToProps, {setProfileImage})(UploadImageModal);

