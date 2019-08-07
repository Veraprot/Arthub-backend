import React from "react";
import ConversationsList from './ConversationsList'
import ConverstationContainer from './ConversationContainer'

function MessageBoard(props) {
  return (
    <div>
      MessageBoard id: {props.match.params.name}
      <ConversationsList/>
      <ConverstationContainer/>
    </div>
  )
}

export default MessageBoard;