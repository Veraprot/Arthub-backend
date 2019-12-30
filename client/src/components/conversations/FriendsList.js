import React, {useEffect}  from "react"
import { getFriends } from '../../actions/friendActions'
import {Form } from 'semantic-ui-react'
import { useDispatch, useSelector } from 'react-redux'

function FriendsList(props) {
  const currentUser = useSelector(state => state.user);
  const {accepted} = useSelector(state => state.user.friends || []);

  const dispatch = useDispatch();
  useEffect(() => {
    if(!accepted) {
      dispatch(getFriends(currentUser._id))
    }
  },[])

  const renderFriends = () => {
    if(currentUser.friends && accepted &&accepted.length > 0) {
      return accepted.map(friend => {
        return(
          <div key={friend._id}>{friend.name}</div>
        )
      })
    }
  }

  return (
    <div className="modal" onClick={props.closeNewConversation}>
      {/* go throug hfriends list, if conversation exists switch to that conversation otherwise switch to new empty conversation */}
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