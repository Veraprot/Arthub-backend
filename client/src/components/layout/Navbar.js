import  React  from "react";
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { logoutUser } from '../../actions/userActions'
import { withRouter } from 'react-router'
import { Icon } from 'semantic-ui-react';

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
      <div>
        <form action="">
          <div>
            <input type="text" placeholder="Search..."/>
          </div>
        </form>
      </div>
      <button onClick={handleClick}>logout</button>
      <Link to={`/conversations/`}>
        <Icon name='comment alternate' size='large' />
      </Link>
      <Link to="/friends">
        <Icon name='group' size='large' />
      </Link>
      <Link to="/user">
        <Icon name='user' size='large' />
      </Link>
    </>
  );
  return (
    <div className="navbar-wrapper">
      {props.user.isAuthenticated ? authLinks : guestLinks}
    </div>
  )
}

const mapStateToProps = state => ({
  user: state.user
})
export default connect(mapStateToProps, {logoutUser})(withRouter(Navbar));