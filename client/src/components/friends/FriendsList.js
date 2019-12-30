import React, {useEffect} from "react";
import ReceivedRequests from './ReceivedRequests'
import FriendCard from './FriendCard'
import { getFriends } from '../../actions/friendActions'
import { useDispatch, useSelector } from 'react-redux'

function FriendsList() {
  const currentUser = useSelector(state => state.user);
  const {accepted, requested, received} = useSelector(state => state.user.friends || []);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getFriends(currentUser._id))
  }, [])

  // const renderFriendRequests = () => {
  //   <ReceivedRequests/>
  // }
  const renderFriends = (friendType) => {
    if(currentUser.friends && friendType.length > 0) {
      return friendType.map(friend => {
        return(
          <FriendCard key={friend._id} user={friend}/>
        )
      })
    }
  }

  return (
    <>
      <div className="invitations-container">
        {renderFriends(requested)}
      </div>
      <div className="invitations-container">
        {renderFriends(received)}
      </div>
      <div className="friends-container">
        {renderFriends(accepted)} 
      </div>
    </>
  )
}

export default FriendsList;