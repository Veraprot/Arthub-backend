import axios from 'axios'
import {GET_CONVERSATIONS, GET_MESSAGES} from './types'

const apiRoot = process.env.REACT_APP_API_ROOT

export const getConversations = (userId) => dispatch => {
  axios.get(`${apiRoot}/users/${userId}/conversations`)
    .then(res => {
      dispatch({
        type: GET_CONVERSATIONS, 
        payload: res.data
      })
    })
}


export const getMessages = (userId, conversationId) => dispatch => {
  axios.get(`${apiRoot}/users/${userId}/conversations/${conversationId}/messages`)
    .then(res => {
      dispatch({
        type: GET_MESSAGES, 
        payload: res.data
      })
    })
}

export const sendMessage = (conversationId, userId) => dispatch => {
  axios.get(`${apiRoot}/users/${userId}/conversations/${conversationId}/messages/create`)
    .then(res => {
      console.log(res)
      // dispatch({
      //   type: GET_MESSAGES, 
      //   payload: res.data
      // })
    })
}