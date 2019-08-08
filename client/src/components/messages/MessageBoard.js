import React from "react";
import ConversationsList from './ConversationsList'
import ConverstationContainer from './ConversationContainer'

function MessageBoard(props) {
  return (
    <div className="message-section">
      <ConversationsList/>
      <ConverstationContainer currentUser={props.match.params.name}/>
    </div>
  )
}

export default MessageBoard;