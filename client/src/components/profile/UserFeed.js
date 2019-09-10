import React, {useEffect} from "react";
import {connect} from 'react-redux'
import {getItems} from '../../actions/itemActions'
const resourceRoot = process.env.REACT_APP_RESOURCE_ROOT

function UserFeed(props) {
  useEffect(() => {
    props.getItems(props.currentUser._id)
  }, [])

  return (
    <div className="profile-feed-container">
      {
        props.items.map(item => {
          return (
            <div key={item._id} className="item-container">
              <img src={`${resourceRoot}/${item.image}`} alt=""/>
            </div>
          )
        })
      }
    </div>
  )
}

const mapStateToProps = state => ({
  currentUser: state.user.info, 
  items: state.items.all
})

export default connect(mapStateToProps, {getItems})(UserFeed);
