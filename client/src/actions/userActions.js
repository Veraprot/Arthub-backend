import {SET_CURRENT_USER, GET_ERRORS, CLEAR_ERRORS} from './types';
import axios from 'axios'
import setHeaders from '../utils/setHeaders'

const apiRoot = process.env.REACT_APP_API_ROOT

export const loginUser = (userData) => dispatch => {
  axios.post(`${apiRoot}/users/login`, userData)
    .then(res => {
      const { token } = res.data
      localStorage.setItem('jwtToken', token);
      setHeaders(token);
      console.log(res.data.user)
      dispatch(setCurrentUser(res.data.user));
    })
    .catch(err => {
      if(err.response.status === 404) {
        dispatch(setErrors({notFound: err.response.data.error}))
      }
    })
}

export const registerUser = (userData, history) => dispatch => {
  console.log(history)
  axios.post(`${apiRoot}/users/register`, userData)
    .then(res => {
      history.push('/login')
    })
    .catch(err => console.log(err))
}

export const getCurrentUser = (userId) => dispatch => {
  axios.get(`${apiRoot}/users/${userId}`)
  .then(res => {
    console.log(res.data)
    dispatch(setCurrentUser(res.data.user));
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