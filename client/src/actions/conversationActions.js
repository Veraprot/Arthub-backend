import axios from 'axios'
import {GET_CONVERSATIONS} from './types'

const apiRoot = process.env.REACT_APP_API_ROOT

export const getConversations = (userId) => dispatch => {
  axios.get(`${apiRoot}/users/${userId}/conversations`)
    .then(res => {
      console.log(res.data)
      dispatch({
        type: GET_CONVERSATIONS, 
        payload: res.data
      })
    })
}