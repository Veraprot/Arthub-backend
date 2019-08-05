import React, { useState } from 'react'
import {Form, Button } from 'semantic-ui-react'
function Login() {
  const handleSubmit = (event) => {
    event.preventDefault()
    console.log(event)
  }

  return (
    <div className="form-container">
      <h1 className="logo-field">Arthub</h1>
      <Form onSubmit={handleSubmit}>
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