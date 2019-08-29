import axios from 'axios'
const apiRoot = process.env.REACT_APP_API_ROOT

export const setProfileImage = (userId, file) => {
  console.log('hi there')
  console.log(file)

  const formData = new FormData();
  formData.append('image', file)

  console.log(formData)
  
  axios.patch(`${apiRoot}/users/${userId}/edit`, formData)
    .then(data => {
      console.log(data)
    })
  return {
    type: ''
  }
}