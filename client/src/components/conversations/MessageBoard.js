import React, {useState, useEffect} from "react";
import ConversationsList from './ConversationsList'
import ConverstationContainer from './ConversationContainer'
import FriendsList from './FriendsList'
import {connect} from 'react-redux'

import { getConversations } from '../../actions/conversationActions'

function MessageBoard(props) {
  const [friendsModal, setFriendsModal] = useState(false)
  
  const toggleFriendsModal = () => {
    setFriendsModal(!friendsModal)
  }
  
  useEffect(() => {
    props.getConversations(props.currentUser._id)
  }, [])

  return (
    <div className="message-section">
      <ConversationsList openNewConversation={toggleFriendsModal} />
      <ConverstationContainer currentUser={props.match.params.name}/>
      {
        friendsModal && 
        <FriendsList closeNewConversation={toggleFriendsModal}/>
      }
    </div>
  )
}

const mapStateToProps = state => ({
  currentUser: state.auth.user, 
  conversations: state.conversations
}); 

export default connect(mapStateToProps, {getConversations, getMessages})(MessageBoard);