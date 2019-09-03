import React from "react";
import {connect} from 'react-redux'

function UserFeed(props) {
  return (
    <div className="profile-feed-container">
      user feed
    </div>
  )
}

const mapStateToProps = state => ({
  currentUser: state.user.info, 
})

export default connect(mapStateToProps, {})(UserFeed);
