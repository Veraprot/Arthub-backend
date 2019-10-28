import React, {useState} from "react";
import ReceivedRequests from './ReceivedRequests'
import SentRequests from './SentRequests'

function FriendsList() {
  const [requestType, setRequestType] = useState('received');

  return (
    <>
      <div className="invitations-container">
        <ReceivedRequests/>
        <SentRequests />
      </div>
      <div className="friends-container">
        friends 
      </div>
    </>
  )
}

export default FriendsList;