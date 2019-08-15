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
  auth: state.auth,
});

export default connect(mapStateToProps, About);