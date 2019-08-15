import React, {useState, useEffect} from "react";
import { connect } from 'react-redux'
import openSocket from 'socket.io-client'
import { getMessages, getConversations } from '../../actions/conversationActions'

function ConverstationContainer(props) {
  const socket = openSocket('http://localhost:3001')
  socket.on('messages', data => {
    console.log(data)
  })
  useEffect(() => {
    if(props.conversations.active.length > 0) {
      props.getMessages(props.currentUser._id, props.conversations.active)
    } else  {
      console.log('loading conversations')
    }
  }, [props.conversations.active])

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

const mapStateToProps = state => ({
  currentUser: state.auth.user, 
  conversations: state.conversations
}); 

export default connect(mapStateToProps, {getMessages, getConversations})(ConverstationContainer);
