import React, { useEffect } from 'react'
import { connect } from 'react-redux';

import {Form, Button } from 'semantic-ui-react'
import { loginUser } from '../../actions/authActions'

function Login(props) {
  useEffect(() => {
    if(props.auth.isAuthenticated) {
      props.history.push('/user')
    }
  }, [props.auth.isAuthenticated])

  const handleSubmit = (event) => {
    event.preventDefault()
    let email = event.target["email"].value
    let password = event.target["password"].value
    props.loginUser({email, password})
  }

  const showErrors = () => {
    console.log(props.errors)
    if(props.errors.notFound) {
      props.history.push('/register')
    }
    return(
      <div>errrrroooor</div>
    )
  }

  console.log(props.errors)
  return (
    <div className="form-container">
      <h1 className="logo-field">Arthub</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Field>
          <input type="email" name="email" placeholder='Username or Email' />
        </Form.Field>
        <Form.Field>
          <input type="password" name="password" placeholder='Password' />
        </Form.Field>
        <Button type='submit'>Submit</Button>
      </Form>
      {props.errors.notFound &&
        showErrors()
      }
    </div>
  )
}

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

// export default Login
export default connect(mapStateToProps, { loginUser })(Login);