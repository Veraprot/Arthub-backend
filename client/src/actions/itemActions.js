import axios from 'axios'
import {ADD_ITEM, GET_ITEMS} from './types'

const apiRoot = process.env.REACT_APP_API_ROOT

export const addItem = (userId, file, description) => dispatch => {
  const formData = new FormData();
  formData.append('image', file)
  formData.append('description', description)

  console.log(file)
  axios.post(`${apiRoot}/users/${userId}/items`, formData)
  .then(res => {
    console.log(res.data)
    dispatch({
      type: ADD_ITEM,
      payload: res.data
    })
  })
}

export const getItems = (userId) => dispatch => {
  axios.get(`${apiRoot}/users/${userId}/items`)
    .then(res => {
      dispatch({
        type: GET_ITEMS, 
        payload: res.data
      })
    })
}
