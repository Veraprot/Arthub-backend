import React, {useState} from "react";
import ReceivedRequests from './ReceivedRequests'
import SentRequests from './SentRequests'
import { connect } from 'react-redux'

function FriendsList(props) {
  console.log(props)
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

const mapStateToProps = state => ({
  friends: state.user.friends
}); 
export default connect(mapStateToProps, {})(FriendsList);