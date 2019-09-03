import axios from 'axios'
import {SET_PROFILE_IMAGE, SET_COVER_PHOTO_IMAGE} from './types'

const apiRoot = process.env.REACT_APP_API_ROOT

export const setProfileImage = (userId, options, file) => dispatch => {
  const formData = new FormData();
  formData.append('image', file)
  
  if(options.type === 'avatar') {
    axios.patch(`${apiRoot}/users/${userId}/edit`, formData)
    .then(res => {
      dispatch({
        type: SET_PROFILE_IMAGE,
        payload: res.data.user.avatar
      })
    })
  } else {
    axios.patch(`${apiRoot}/users/${userId}/updateCoverPhoto`, formData)
    .then(res => {
      dispatch({
        type: SET_COVER_PHOTO_IMAGE,
        payload: res.data.coverPhoto
      })
    })
  }
}

