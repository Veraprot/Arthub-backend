import React, {useState} from "react";
import ConversationsList from './ConversationsList'
import ConverstationContainer from './ConversationContainer'
import FriendsList from './FriendsList'


function MessageBoard(props) {
  const [friendsModal, setFriendsModal] = useState(false)
  
  const toggleFriendsModal = () => {
    setFriendsModal(!friendsModal)
  }
  
  return (
    <div className="message-board">
      <ConversationsList openNewConversation={toggleFriendsModal} />
      <ConverstationContainer currentUser={props.match.params.name}/>
      {
        friendsModal && 
        <FriendsList closeNewConversation={toggleFriendsModal}/>
      }
    </div>
  )
}

export default MessageBoard;