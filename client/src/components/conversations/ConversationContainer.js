import React, {useState, useEffect} from "react";
import { connect } from 'react-redux'
import openSocket from 'socket.io-client'
import { getMessages, getConversations, sendMessage, setNewMessage } from '../../actions/conversationActions'

const socket = openSocket('http://localhost:3001')

function ConverstationContainer(props) {
  const [userInput, setUserInput] = useState('')
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    socket.on('message', data => {
      console.log('runs')
      props.setNewMessage(data)
      setUserInput("")
    })
  }, [])
  
  useEffect(() => {
    if(props.conversations.active.length > 0) {
      props.getMessages(props.currentUser._id, props.conversations.active)
    } else  {
      console.log('loading conversations')
    }
  }, [props.conversations.active])

  useEffect(() => {
    setLoaded(true)
  }, [props.conversations.messages])


  const handleUserInput = (event) => {
    // event.preventDefault()
    if (event.key === 'Enter') {
      console.log('send message')
      props.sendMessage(props.currentUser._id, props.conversations.active, userInput)
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
        {loaded ? (
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

export default connect(mapStateToProps, {getMessages, getConversations, sendMessage, setNewMessage})(ConverstationContainer);
