import React, {useEffect} from "react";
import ReceivedRequests from './ReceivedRequests'
import SentRequests from './SentRequests'
import { getFriends } from '../../actions/friendActions'
import { useDispatch, useSelector } from 'react-redux'

function FriendsList() {
  const currentUser = useSelector(state => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getFriends(currentUser._id))
  }, [])

  const renderFriends = () => {
    console.log(currentUser)
    if(currentUser.friends) {
      return currentUser.friends.map(friend => {
        return(
          <div key={friend._id}>{friend.name}</div>
        )
      })
    }
  }

  return (
    <>
      <div className="invitations-container">
        <ReceivedRequests/>
        <SentRequests />
      </div>
      <div className="friends-container">
        {renderFriends()} 
      </div>
    </>
  )
}

export default FriendsList;