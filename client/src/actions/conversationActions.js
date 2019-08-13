import axios from 'axios'
const apiRoot = process.env.REACT_APP_API_ROOT

export const getUserConversations = () => dispatch => {
  axios.post(`${apiRoot}`)
}