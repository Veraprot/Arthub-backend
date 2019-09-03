import React, {useEffect} from "react";
import {connect} from 'react-redux'
import {getItems} from '../../actions/itemActions'

function UserFeed(props) {
  useEffect(() => {
    props.getItems(props.currentUser._id)
  }, [])
  
  const renderItems = () => {
    console.log(props.items)
    return (
      <div>ho</div>
    )
  }

  return (
    <div className="profile-feed-container">
      user feed
      {renderItems()}
    </div>
  )
}

const mapStateToProps = state => ({
  currentUser: state.user.info, 
  items: state.items.all
})

export default connect(mapStateToProps, {getItems})(UserFeed);
