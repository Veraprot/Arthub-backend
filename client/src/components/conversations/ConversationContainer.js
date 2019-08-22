import React, {useState, useEffect} from "react";
import { connect } from 'react-redux'
import openSocket from 'socket.io-client'
import { getMessages, getConversations, sendMessage, setNewMessage } from '../../actions/conversationActions'

const socket = openSocket('http://localhost:3001')
function ConverstationContainer(props) {
  const [userInput, setUserInput] = useState('')
  const [loaded, setLoaded] = useState(false)
  const messageContainerRef = React.createRef();

  useEffect(() => {
      // Connected, let's sign-up for to receive messages for this room
    socket.on('message', data => {
      props.setNewMessage(props.currentUser._id, data)
      setUserInput("")
    })
  }, [])
  
  useEffect(() => {
    props.getMessages(props.currentUser._id, props.conversations.active)
  }, [props.conversations.active])

  useEffect(() => {
    setLoaded(true)
    scrollToBottom()
  }, [props.conversations.messages])

  const scrollToBottom = () => {
    messageContainerRef.current.scrollTop = messageContainerRef.current.scrollHeight;
  }

  const handleUserInput = (event) => {
    if (event.key === 'Enter') {
      props.sendMessage(props.currentUser._id, props.conversations.active, userInput)
    }  else {
      setUserInput(event.target.value)
    }
  }

  const loadMessage = (message) => {
      let isAdmin = ""
      if (message.admin) {
        isAdmin = "admin"
      }
      return (
        <div key={message._id} className={"message-row" + " " + isAdmin}>
          <div className={"message-box"}>
            <span>{message.content}</span>
          </div>
        </div>
      )
  }

  const loadAllMessages = () => {
    return props.conversations.messages.map(message => {
      return loadMessage(message)
    })
  }

  return (
    <div className="chat-section">
      <div className="messages-container" ref={messageContainerRef}>
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
