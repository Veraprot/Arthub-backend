import React from "react";
import { Link } from 'react-router-dom';

function FriendCard(props) {
  console.log(props.user)
  return (
    <div className="friend-card">
      <div className="avatar-container">
        <img className="profile-icon" src={`${props.user.avatar}`} alt=""/>
      </div>
      <div className="profile-info">
        <Link to='/users/'>{props.user.name}</Link>
      </div>
    </div>
  )
}

export default FriendCard;