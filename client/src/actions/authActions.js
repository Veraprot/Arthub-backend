import {SET_CURRENT_USER} from './types';
// import axios from 'axios'

export const loginUser = (userData) => dispatch => {
  console.log(userData)
  debugger
  // axios.post('/users/login', userData)
  //   .then(res => console.log(res.json))
  dispatch({
    type: SET_CURRENT_USER,
    payload: userData
  })
}