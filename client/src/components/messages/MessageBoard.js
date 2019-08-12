import React from "react";
import ConversationsList from './ConversationsList'
import ConverstationContainer from './ConversationContainer'
import openSocket from 'socket.io-client'

function MessageBoard(props) {
  const socket = openSocket('http://localhost:3001')
  socket.on('conversation', data => {
    console.log('why', data)
  })

  return (
    <div className="message-section">
      <ConversationsList/>
      <ConverstationContainer currentUser={props.match.params.name}/>
    </div>
  )
}

export default MessageBoard;