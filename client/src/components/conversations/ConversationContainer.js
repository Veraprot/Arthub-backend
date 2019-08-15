import React, {useState, useEffect} from "react";
import { connect } from 'react-redux'
import openSocket from 'socket.io-client'
import { getMessages, getConversations } from '../../actions/conversationActions'

function ConverstationContainer(props) {
  const [userInput, setUserInput] = useState('')
  const [messages, setMessages] = useState(false)
  const socket = openSocket('http://localhost:3001')
  socket.on('messages', data => {
    // console.log(data)
  })
  useEffect(() => {
    if(props.conversations.active.length > 0) {
      props.getMessages(props.currentUser._id, props.conversations.active)
    } else  {
      // console.log('loading conversations')
    }
  }, [props.conversations.active])

  useEffect(() => {
    setMessages(true)
  }, [props.conversations.messages])

  const handleUserInput = (event) => {
    if (event.key === 'Enter') {
      console.log('send message')
    }  else {
      setUserInput(event.target.value)
    }
  }

  const loadMessage = (message) => {
      return (
        <div key={message._id}>
          {message.content}
        </div>
      )
  }

  const loadAllMessages = () => {
    return props.conversations.messages.map(message => {
      return loadMessage(message)
    })
  }
  
  return (
    <div className="chat-container">
      <div>
        {messages ? (
           loadAllMessages()
        ) : (
          <div>loading</div>
        )}
      </div>
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
