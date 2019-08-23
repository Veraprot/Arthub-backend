import React, {useState, useEffect} from "react";
import { connect } from 'react-redux'
import ConversationsList from './ConversationsList'
import ConverstationContainer from './ConversationContainer'
import FriendsList from './FriendsList'
import { getConversations} from '../../actions/conversationActions'
// import io from 'socket.io-client'
// const socket = io('http://localhost:3001')

function MessageBoard(props) {
  const [friendsModal, setFriendsModal] = useState(false)

  const toggleFriendsModal = () => {
    setFriendsModal(!friendsModal)
  }

  useEffect(() => {
    // socket.on('connect', () => {
    //   console.log('Socket connected FROM React...')
    //   if(props.conversations.active) {
    //     socket.emit('chatroom', props.conversations.active)
    //   }     
    // });
  }, [])
  
  return (
    <div className="message-board">
      <ConversationsList openNewConversation={toggleFriendsModal} />
      {(props.conversations.active.length > 0) &&
        <ConverstationContainer/>
      }
      {
        friendsModal && 
        <FriendsList closeNewConversation={toggleFriendsModal}/>
      }
    </div>
  )
}

const mapStateToProps = state => ({
  conversations: state.conversations
}); 

export default connect(mapStateToProps, {getConversations})(MessageBoard);