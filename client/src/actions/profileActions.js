import axios from 'axios'
import {SET_PROFILE_IMAGE} from './types'

const apiRoot = process.env.REACT_APP_API_ROOT

export const setProfileImage = (userId, file) => dispatch => {
  const formData = new FormData();
  formData.append('image', file)
  
  axios.patch(`${apiRoot}/users/${userId}/edit`, formData)
    .then(res => {
      dispatch({
        type: SET_PROFILE_IMAGE,
        payload: res.data.user.avatar
      })
    })
}

