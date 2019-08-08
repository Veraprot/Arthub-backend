import React from "react";
import { connect } from 'react-redux'
 
function ConversationsList(props) {
  console.log(props)
  return (
    <div>
      Convos
    </div>
  )
}

const mapStateToProps = state => ({
  user: state.auth
})
export default connect(mapStateToProps)(ConversationsList);