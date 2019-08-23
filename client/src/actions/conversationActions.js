import axios from 'axios'
import {GET_CONVERSATIONS, GET_MESSAGES, SET_NEW_MESSAGE, SET_CONVERSATION} from './types'

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

export const setActiveConversation = (conversationId) => dispatch => {
  dispatch({
    type: SET_CONVERSATION, 
    payload: conversationId
  })
}

export const getMessages = (userId, conversationId) => dispatch => {
  axios.get(`${apiRoot}/conversations/${conversationId}/messages`)
    .then(res => {
      res.data.map(message => {
        message.admin = checkMessageAuthor(userId, message.user)
      })

      dispatch({
        type: GET_MESSAGES, 
        payload: res.data
      })
    })
}

export const sendMessage = (userId, conversationId, message) => dispatch => {
  axios.post(`${apiRoot}/conversations/${conversationId}/messages/create`, 
  { 
    content: message, 
    userId
  })
}

export const setNewMessage = (userId, data) => dispatch => {
  console.log(data)
  data.admin = checkMessageAuthor(userId, data.user._id)
  dispatch({
    type: SET_NEW_MESSAGE, 
    payload: data
  })
}

const checkMessageAuthor = (currentUser, userId) => {
  return currentUser === userId
}