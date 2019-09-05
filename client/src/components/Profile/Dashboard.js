import React, {useState} from "react";
import { Link } from 'react-router-dom';
import UploadImageModal from '../common/UploadImageModal'
import UserFeed from './UserFeed'

import {connect} from 'react-redux'
const resourceRoot = process.env.REACT_APP_RESOURCE_ROOT

function Dashboard(props) {
  const[uploadModal, setUploadModal] = useState(false)
  const[uploadModalOptions, setUploadModalOpitons] = useState({})

  const toggleUploadView = (imageType) => {
    setUploadModal(!uploadModal)
    setUploadModalOpitons({type: imageType})
  }

  return (
    <div className="profile-dashboard full-hd">
      <div className="profile-info-container">
        <div className="cover-photo-container">
          <img 
          src={`${resourceRoot}/${props.currentUser.coverPhoto}`}
           alt=""/>
          <div className="photo-icon" onClick={() => toggleUploadView('coverPhoto')}></div>
        </div>
        <div className="user-info-navbar">
          <div className="avatar-container">
            <img className="profile-icon" src={`${resourceRoot}/${props.currentUser.avatar}`} alt=""/>
            <div className="profile-pic-selector">
              <div className="update-photo-btn" onClick={() => toggleUploadView('avatar')}>update</div>
            </div>
          </div>
          <div className="nav-items">
              <div>{props.currentUser.name}</div>
              <Link to="/friends">
                friends
              </Link>
              <div onClick={() => toggleUploadView('add item')}>+ add photos</div>
          </div>
        </div>
      </div>
      <UserFeed/>
      {
         uploadModal && 
        <UploadImageModal close={toggleUploadView} options={uploadModalOptions}/>
      }
    </div>
  )
}

const mapStateToProps = state => ({
  currentUser: state.user.info, 
})

export default connect(mapStateToProps, {})(Dashboard);
