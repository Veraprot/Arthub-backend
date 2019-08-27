import React, {useState} from "react";
import { Link } from 'react-router-dom';
import UploadImageModal from '../common/UploadImageModal'

function Dashboard() {
  const[uploadModal, setUploadModal] = useState(true)

  const toggleUploadView = (e) => {
    setUploadModal(!uploadModal)
  }

  return (
    <div className="profile-dashboard full-hd">
      <div className="profile-info-container">
        <div className="cover-photo-container"></div>
        <div className="user-info-navbar">
        <div className="avatar-container">
          <img className="profile-icon" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTUPSysKN4CPaJbicNW2tNU-CgOiL6UxNkrNpmkH1VootIR6MkqXQ" alt=""/>
          <div className="profile-pic-selector">
            <div className="update-photo-btn" onClick={toggleUploadView}>update</div>
          </div>
        </div>
        <div>firstName LastName</div>
        <Link to="/friends">
          friends
        </Link>
        </div>
      </div>
      <div className="profile-feed-container">
        use feed
      </div>
      {
         uploadModal && 
        <UploadImageModal close={toggleUploadView}/>
      }
    </div>
  )
}

export default Dashboard;