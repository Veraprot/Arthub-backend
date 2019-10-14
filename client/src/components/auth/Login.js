import React, { useEffect } from 'react'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {Form, Button } from 'semantic-ui-react'
import { loginUser, clearErrors } from '../../actions/userActions'

function Login(props) {
  useEffect(() => {
    if(props.user.isAuthenticated) {
      props.history.push('/user')
    }
  }, [props.user.isAuthenticated, props.errors, props.history])

  const handleSubmit = (event) => {
    event.preventDefault()
    let email = event.target["email"].value
    let password = event.target["password"].value
    props.loginUser({email, password})
  }

  return (
    <div className="form-container">
      <h1 className="logo-field">Arthub</h1>
      <Form onSubmit={handleSubmit} error>
        <Form.Input 
          error={props.errors.email}
          type="email" 
          name="email" 
          placeholder='Username or Email'
        >
        </Form.Input>
        <Form.Input
          type="password" 
          name="password" placeholder='Password'
        >
        </Form.Input>
        <Button type='submit'>Log In</Button>
        <div>
          <span>Dont have an account? </span>
          <Link to='/register'>Sign up</Link>
        </div>
      </Form>
    </div>
  )
}

const mapStateToProps = state => ({
  user: state.user,
  errors: state.errors
});

export default connect(mapStateToProps, { loginUser, clearErrors })(Login);