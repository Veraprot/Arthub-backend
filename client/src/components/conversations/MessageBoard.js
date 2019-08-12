import React, {useState} from "react";
import ConversationsList from './ConversationsList'
import ConverstationContainer from './ConversationContainer'
import openSocket from 'socket.io-client'
import FriendsList from './FriendsList'
function MessageBoard(props) {
  const socket = openSocket('http://localhost:3001')
  socket.on('conversation', data => {
    console.log(data)
  })

  const [friendsModal, setFriendsModal] = useState(false)

  const toggleFriendsModal = () => {
    setFriendsModal(!friendsModal)
  }
   
  return (
    <div className="message-section">
      <ConversationsList openNewConversation={toggleFriendsModal}/>
      <ConverstationContainer currentUser={props.match.params.name}/>
      {
        friendsModal && 
        <FriendsList closeNewConversation={toggleFriendsModal}/>
      }
    </div>
  )
}

export default MessageBoard;