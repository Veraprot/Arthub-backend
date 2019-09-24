import React, {useState} from "react";
import { Link } from 'react-router-dom';
import UploadImageModal from '../common/UploadImageModal'
import UserFeed from './UserFeed'
import { Icon } from 'semantic-ui-react';
import {connect} from 'react-redux'
const resourceRoot = process.env.REACT_APP_RESOURCE_ROOT

function Dashboard(props) {
  const[loading, setLoading] = useState('loading')
  const[uploadModal, setUploadModal] = useState(false)
  const[uploadModalOptions, setUploadModalOpitons] = useState({})
  
  const toggleUploadView = (imageType) => {
    setUploadModal(!uploadModal)
    setUploadModalOpitons({type: imageType})
  }

  return (
    <div className="profile-dashboard full-hd">
      <div className="profile-info-container">
        <div className={`cover-photo-container ${loading}`}>
          <img 
          srcSet={`${props.currentUser.coverPhoto[1].S3Key} 1900w`}
           alt=""/>
          <div className="photo-icon" onClick={() => toggleUploadView('coverPhoto')}>
            <Icon name='photo' size='small' />
            Update cover Photo
          </div>
        </div>
        <div className="user-info-navbar">
          <div className="cover-overlay-container">
            <div className="avatar-container">
              <img className="profile-icon" src={`${resourceRoot}/${props.currentUser.avatar}`} alt=""/>
              <div className="profile-pic-selector">
                <div className="update-photo-btn" onClick={() => toggleUploadView('avatar')}>update</div>
              </div>
            </div>
            <div className="profile-info">{props.currentUser.name}</div>
          </div>
          <div className="nav-items">
            <Link to="/friends">
              friends
            </Link>
            <div className="pointer" onClick={() => toggleUploadView('add item')}>+ Add photos</div>
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
