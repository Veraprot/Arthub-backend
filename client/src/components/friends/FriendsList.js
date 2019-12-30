import React, {useEffect} from "react"
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

  const renderFriends = (friendType) => {
    if(currentUser.friends && friendType &&friendType.length > 0) {
      return friendType.map(friend => {
        return(
          <FriendCard key={friend._id} user={friend}/>
        )
      })
    }
  }

  return (
    <>
      <div className="friends-container">
        {renderFriends(requested)}
      </div>
      <div className="friends-container">
        {renderFriends(received)}
      </div>
      <div className="friends-container">
        {renderFriends(accepted)} 
      </div>
    </>
  )
}

export default FriendsList;