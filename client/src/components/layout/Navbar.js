import  React  from "react";
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { logoutUser } from '../../actions/authActions'

function Navbar(props) {
  console.log('propppopops')
  console.log(props.auth.user.name)
  console.log('propppopops')
  const handleClick = () => {
    props.logoutUser()
  }

  return (
    <div className="navbar-wrapper">
      <button onClick={handleClick}>logout</button>
      <Link to={`/messages/${props.auth.user.name}`}>messages</Link>
    </div>
  )
}

const mapStateToProps = state => ({
  auth: state.auth
})
export default connect(mapStateToProps, {logoutUser})(Navbar);