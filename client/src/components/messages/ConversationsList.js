import React from "react";
import { connect } from 'react-redux'
 
function ConversationsList(props) {
  console.log(props.user)

  const renderFriends = () => {
    return props.user.friends.map( friend => {
      return(
        <div key={friend.user}>
          {friend.user}
        </div>
      )
    })
  }

  return (
    <div className="convertations-list">
      <div className="profile-view-container">
        <div className="avatar-container">
            <img className="profile-icon" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTUPSysKN4CPaJbicNW2tNU-CgOiL6UxNkrNpmkH1VootIR6MkqXQ" alt=""/>
        </div>
        <div className="user-settings-container"> 
            something will go here
        </div>
      </div>
      <div className="friends-list">
        {renderFriends()}
      </div>
    </div>
  )
}

const mapStateToProps = state => ({
  user: state.auth.user
})
export default connect(mapStateToProps)(ConversationsList);