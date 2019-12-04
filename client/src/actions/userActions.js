import {SET_CURRENT_USER, GET_ERRORS, CLEAR_ERRORS} from './types';
import axios from 'axios'
import setHeaders from '../utils/setHeaders'

const apiRoot = process.env.REACT_APP_API_ROOT

export const loginUser = (userData) => dispatch => {
  console.log(userData)
  axios.post(`${apiRoot}/users/login`, userData)
    .then(res => {
      const { token } = res.data
      localStorage.setItem('jwtToken', token);
      setHeaders(token);
      dispatch(setCurrentUser(res.data.user));
    })
    .catch(err => {
      dispatch(setErrors(err.response.data))
    })
}

export const registerUser = (userData, history) => dispatch => {
  if(userData.password !== userData.passwordConfirm) {
    dispatch(setErrors({password: "passwords don't match"}))
    return 
  }
  axios.post(`${apiRoot}/users/register`, userData)
    .then(res => {
      // dispatch(setCurrentUser(res.data.user)); // send data back from the server and login user right away 
      history.push('/login')
    })
    .catch(err => {
      dispatch(setErrors(err.response.data))
    })
}

export const getCurrentUser = (userId) => dispatch => {
  axios.get(`${apiRoot}/users/${userId}`)
  .then(res => {
    dispatch(setCurrentUser(res.data));
  })
}

// Set logged in user
export const setCurrentUser = userInfo => {
  return {
    type: SET_CURRENT_USER,
    payload: userInfo
  };
};

export const setErrors = error => {
  return {
    type: GET_ERRORS, 
    payload: error
  }
}

export const clearErrors = () => {
  return {
    type: CLEAR_ERRORS, 
  }
}

export const logoutUser = () => dispatch => {
  localStorage.removeItem('jwtToken');
  setHeaders(false);
  dispatch(setCurrentUser({}));
}