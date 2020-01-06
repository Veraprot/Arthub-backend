import React, {useState} from "react";
import { connect } from 'react-redux'
import ConversationsList from './ConversationsList'
import ConverstationContainer from './ConversationContainer'
import FriendsList from './FriendsList'
import { useDispatch, useSelector } from 'react-redux'

function MessageBoard() {
  const [friendsModal, setFriendsModal] = useState(false)
  const conversations = useSelector(state => state.conversations || [])
  // const {accepted} = useSelector(state => state.user.friends || []);

  // const dispatch = useDispatch();

  const toggleFriendsModal = () => {
    setFriendsModal(!friendsModal)
  }
  
  console.log(conversations)
  return (
    <div className="message-board">
      <ConversationsList openNewConversation={toggleFriendsModal} />
      {(conversations.active.length > 0) &&
        <ConverstationContainer/>
      }
      {
        friendsModal && 
        <FriendsList closeNewConversation={toggleFriendsModal}/>
      }
    </div>
  )
}

export default MessageBoard;