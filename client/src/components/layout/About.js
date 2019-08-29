import  React from "react";
import { connect } from 'react-redux';
function About(props) {
  return (
    <div>
      About
    </div>
  )
}

const mapStateToProps = state => ({
  user: state.user,
});

export default connect(mapStateToProps, About);