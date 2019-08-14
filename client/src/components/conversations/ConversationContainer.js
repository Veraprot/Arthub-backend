import React, {useState} from "react";

function ConverstationContainer(props) {

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