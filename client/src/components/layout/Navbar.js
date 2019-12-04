import  React  from "react";
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { logoutUser } from '../../actions/userActions'
import { withRouter } from 'react-router'
import { Icon } from 'semantic-ui-react';
const resourceRoot = process.env.REACT_APP_RESOURCE_ROOT

function Navbar(props) {
  const handleClick = () => {
    props.logoutUser()
  }

  const guestLinks = (
    <>
      {/* <Link to="/about">
        About
      </Link> */}
    </>
  );

  const authLinks = (
    <>
      <div className="search-wrapper">
        <form action="">
          <div>
            <input type="text" placeholder="Search..."/>
          </div>
        </form>
      </div>
      <div className="navigation-links">
        <Link to="/user">
          <div className="avatar-container">
              {/* <img className="profile-icon" src={`${resourceRoot}/${props.user.info.avatar}`} alt=""/> */}
          </div>
          <span>{props.user.info.name}</span>
        </Link>
        <Link to={`/conversations/`}>
          <Icon name='comment alternate' size='large' />
        </Link>
        <Link to="/friends">
          <Icon name='group' size='large' />
        </Link>
        <span>
          <Icon onClick={handleClick} name='cog' size='large'/>
        </span>
      </div>
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