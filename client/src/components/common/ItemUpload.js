import React, {useState} from "react";
import {addItem} from '../../actions/itemActions'
import { connect } from 'react-redux'

function ItemUpload(props) {
  const [image, setImage] = useState(null)
  const [description, setDescription] = useState('')
  const [uploadFile, setUploadFile] = useState(null)
  const imageRef = React.createRef();

  const changeUploadFile = (e) => {
    setImage(URL.createObjectURL(e.target.files[0]))
    setUploadFile(e.target.files[0])
  }

  const sendItemForm = (e) => {
    props.addItem(props.currentUser._id, uploadFile, description)
  }
  
  return (
    <>
      <img src={image} alt=""/>
      <div className="upload-btn">
        <input type="file" accept="image/*, image/heic, image/heif" onChange={changeUploadFile} ref={imageRef}/>
      </div>
      <div>
        {
          image && 
          <input value={description} onChange={(event) => setDescription(event.target.value)} placeholder="Add description..." className="message"/>
        }
      </div>
      <div onClick={sendItemForm}>Submit</div>
    </>
  )
}

const mapStateToProps = state => ({
  currentUser: state.user.info, 
}); 
export default connect(mapStateToProps, {addItem})(ItemUpload);


