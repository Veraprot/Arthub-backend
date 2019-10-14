import React from 'react'
import {Form, Button} from 'semantic-ui-react'
import { registerUser } from '../../actions/userActions'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

function Register(props) {

  const handleSubmit = (event) => {
    event.preventDefault()
    let name = event.target["name"].value
    let email = event.target["email"].value
    let password = event.target["password"].value
    let passwordConfirm = event.target["confirmation"].value

    const newUser = {
      name, 
      email,
      password, 
      passwordConfirm
    };
    props.registerUser(newUser, props.history)
  }

  return (
      <div className="form-container">
        <h1 className="logo-field">Arthub</h1>

        <Form 
          error 
          onSubmit={handleSubmit}>
          <Form.Input 
            error={props.errors.username}
            name="name" placeholder='name'>
          </Form.Input>
          <Form.Input
            error={props.errors.email}
            name="email" placeholder='Username or Email'>
          </Form.Input>
          <Form.Input
            error={props.errors.password}
            name="password" placeholder='Password'>
          </Form.Input>
          <Form.Input
            error={props.errors.password}
            name="confirmation" placeholder='Password Confirmation'>
          </Form.Input>
          <Button primary type='submit'>Submit</Button>
        </Form>
        <div>
          <span>Already have an Account? </span>
          <Link to='/login'>Log in</Link>
        </div>
      </div>
  )
}

const mapStateToProps = state => ({
  errors: state.errors
});

export default connect(mapStateToProps, {registerUser })(Register);
