import React from "react";
import { Link } from 'react-router-dom';

function Dashboard() {
  return (
    <div className="profile-dashboard full-hd">
      <div className="profile-info-container">
        <div className="cover-photo-container"></div>
        <div className="user-info-navbar">
        <div className="avatar-container">
            <img className="profile-icon" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTUPSysKN4CPaJbicNW2tNU-CgOiL6UxNkrNpmkH1VootIR6MkqXQ" alt=""/>
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
    </div>
  )
}

export default Dashboard;