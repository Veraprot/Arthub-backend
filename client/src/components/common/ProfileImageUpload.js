import React, {useState} from "react";
import {setProfileImage} from '../../actions/profileActions'
import { connect } from 'react-redux'

function UploadImageModal(props) {
  const [image, setImage] = useState(null)
  const imageRef = React.createRef();

  const changeUploadFile = (e) => {
    setImage(URL.createObjectURL(e.target.files[0]))
    props.setProfileImage(props.currentUser._id, props.options, e.target.files[0])
  }

  return (
    <>
      <img src={image} alt=""/>
      <div className="upload-btn">
        <input type="file" accept="image/*, image/heic, image/heif" onChange={changeUploadFile} ref={imageRef}/>
      </div>
    </>
  )
}

const mapStateToProps = state => ({
  currentUser: state.user.info, 
}); 
export default connect(mapStateToProps, {setProfileImage})(UploadImageModal);


