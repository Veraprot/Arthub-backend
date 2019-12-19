import axios from 'axios'
import {GET_FRIENDS} from './types'
import isEmpty from '../validation/isEmpty'

const apiRoot = process.env.REACT_APP_API_ROOT

export const getFriends = (userId) => dispatch => {
  axios.get(`${apiRoot}/users/${userId}/friends`)
    .then(res => {
      if(!isEmpty(res.data)) {
        console.log(res.data)
        dispatch({
          type: GET_FRIENDS, 
          payload: res.data
        })
      }
    })
}