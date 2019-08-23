import {SET_CURRENT_USER, GET_ERRORS, CLEAR_ERRORS} from './types';
import axios from 'axios'
import jwt_decode from 'jwt-decode';
import setHeaders from '../utils/setHeaders'

const apiRoot = process.env.REACT_APP_API_ROOT

export const loginUser = (userData) => dispatch => {
  axios.post(`${apiRoot}/users/login`, userData)
    .then(res => {
      const { token } = res.data
      localStorage.setItem('jwtToken', token);
      const decoded = jwt_decode(token);
      setHeaders(token);
      dispatch(setCurrentUser(decoded));
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

// Set logged in user
export const setCurrentUser = decoded => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded
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

export const logoutUser = (history) => dispatch => {
  localStorage.removeItem('jwtToken');
  setHeaders(false);
  dispatch(setCurrentUser({}));
  history.push('/login')
}