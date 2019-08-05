import React from 'react'
import {Form, Button} from 'semantic-ui-react'
function Login() {
  return (
    <div class="form-container">
      <h1 class="logo-field">Arthub</h1>
      <Form>
        <Form.Field>
          <input placeholder='Username or Email' />
        </Form.Field>
        <Form.Field>
          <input placeholder='Password' />
        </Form.Field>
        <Button type='submit'>Submit</Button>
      </Form>
    </div>
  )
}

export default Login