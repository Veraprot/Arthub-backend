import React from "react";
import { connect } from 'react-redux'
 
function ConversationsList(props) {
  console.log(props.user)
  return (
    <div>
      Convos
    </div>
  )
}

const mapStateToProps = state => ({
  user: state.auth.user
})
export default connect(mapStateToProps)(ConversationsList);