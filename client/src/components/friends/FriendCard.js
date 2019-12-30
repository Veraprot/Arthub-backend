import React from "react";

function FriendCard(props) {
  return (
    <div className="friend-container">
      {props.user.name}
    </div>
  )
}

export default FriendCard;