import React, {useState} from "react";
import ReceivedRequests from './ReceivedRequests'
import SentRequests from './ReceivedRequests'

function FriendsList() {
  const [requestType, setRequestType] = useState('received');

  const toggleRequests = () => {
    console.log(requestType)
  }

  return (
    <>
      <div className="invitations-container">
        <ReceivedRequests category="received" checkRequests={toggleRequests}/>
        <SentRequests />
      </div>
      <div className="friends-container">
        friends 
      </div>
    </>
  )
}

export default FriendsList;