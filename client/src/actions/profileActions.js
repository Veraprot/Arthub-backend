import axios from 'axios'
import {SET_PROFILE_IMAGE} from './types'

const apiRoot = process.env.REACT_APP_API_ROOT

export const setProfileImage = (userId, file) => dispatch => {
  console.log('hi there')
  console.log(file)

  const formData = new FormData();
  formData.append('image', file)

  console.log(formData)
  
  axios.patch(`${apiRoot}/users/${userId}/edit`, formData)
    .then(res => {
      console.log(res.data.user.avatar)
      dispatch({
        type: SET_PROFILE_IMAGE,
        payload: res.data.user.avatar
      })
    })
}
