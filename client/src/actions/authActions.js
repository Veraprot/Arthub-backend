import {SET_CURRENT_USER} from './types';
import axios from 'axios'
import jwt_decode from 'jwt-decode';
const apiRoot = process.env.REACT_APP_API_ROOT

export const loginUser = (userData) => dispatch => {
  console.log(axios.defaults.headers)
  axios.post(`${apiRoot}/users/login`, userData)
    .then(res => {
      const { token } = res.data
      localStorage.setItem('jwtToken', token);
      const decoded = jwt_decode(token);
      console.log('decoded', decoded)
    })
  dispatch({
    type: SET_CURRENT_USER,
    payload: userData
  })
}