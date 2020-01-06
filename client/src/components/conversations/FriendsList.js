import React, {useEffect}  from "react"
import { getFriends } from '../../actions/friendActions'
import {Form} from 'semantic-ui-react'
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import { getConversations, setActiveConversation, createConversation } from '../../actions/conversationActions'

function FriendsList(props) {
  const currentUser = useSelector(state => state.user);
  const {accepted} = useSelector(state => state.user.friends || []);

  const dispatch = useDispatch();
  useEffect(() => {
    if(!accepted) {
      dispatch(getFriends(currentUser._id))
    }
  },[])

  const switchToConversation = (e, friendId) => {
    e.preventDefault()
    dispatch(createConversation(currentUser._id, friendId))
  }

  const renderFriends = () => {
    if(currentUser.friends && accepted &&accepted.length > 0) {
      return accepted.map(friend => {
        return(
          <>
            <div className="avatar-container">
              <img className="profile-icon" src={`${friend.avatar}`} alt=""/>
            </div>
            <div className="profile-info">
              <p onClick={(e) => switchToConversation(e, friend._id)}>{friend.name}</p>
            </div>
          </>
        )
      })
    }
  }

  return (
    <div className="modal" onClick={props.closeNewConversation}>
      <div className="modal-container chat" onClick={(e) => e.stopPropagation()}>
        <div className="search-container">
          <Form>
            <Form.Input 
              type="name" 
              name="name" 
              placeholder='Search'
            >
            </Form.Input>
          </Form>
        </div> 
        <div className="friends-list">
          {renderFriends()}
        </div>
      </div>
    </div>
  )
}

export default FriendsList;