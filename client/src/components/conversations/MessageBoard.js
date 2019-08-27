import React, {useState} from "react";
import { connect } from 'react-redux'
import ConversationsList from './ConversationsList'
import ConverstationContainer from './ConversationContainer'
import FriendsList from './FriendsList'
import { getConversations} from '../../actions/conversationActions'

function MessageBoard(props) {
  const [friendsModal, setFriendsModal] = useState(false)

  const toggleFriendsModal = () => {
    setFriendsModal(!friendsModal)
  }
  
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