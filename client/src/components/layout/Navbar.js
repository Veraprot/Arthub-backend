import  React  from "react";
import { connect } from 'react-redux';

import { logoutUser } from '../../actions/authActions'

function Navbar(props) {
  const handleClick = () => {
    props.logoutUser()
  }

  return (
    <div className="navbar-wrapper">
      hi
      <button onClick={handleClick}>logout</button>
    </div>
  )
}

export default connect(null, {logoutUser})(Navbar);