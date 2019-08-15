import React, {useState} from "react";
import { connect } from 'react-redux'
import openSocket from 'socket.io-client'

function ConverstationContainer(props) {
  const socket = openSocket('http://localhost:3001')
  socket.on('messages', data => {
    console.log(data)
  })

  const [userInput, setUserInput] = useState('')

  const handleUserInput = (event) => {
    if (event.key === 'Enter') {
      console.log('send message')
    }  else {
      setUserInput(event.target.value)
    }
  }
  return (
    <div className="chat-container">
      current conversation
      <div className="message-input-container">
      <input value={userInput} placeholder="Type your message here..." className="message"  onChange={handleUserInput} onKeyPress={handleUserInput}/>
      </div>
    </div>
  )
}

export default ConverstationContainer;