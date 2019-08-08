import  React  from "react";
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { logoutUser } from '../../actions/authActions'

function Navbar(props) {
  const handleClick = () => {
    props.logoutUser()
  }

  const guestLinks = (
    <>
      <Link to="/register">
        Sign Up
      </Link>
      <Link to="/login">
        Login
      </Link>
    </>
  );

  const authLinks = (
    <>
      <button onClick={handleClick}>logout</button>
      <Link to={`/messages/${props.auth.user.name}`}>messages</Link>
    </>
  );

  return (
    <div className="navbar-wrapper">
      {props.auth.isAuthenticated ? authLinks : guestLinks}
    </div>
  )
}

const mapStateToProps = state => ({
  auth: state.auth
})
export default connect(mapStateToProps, {logoutUser})(Navbar);