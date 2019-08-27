import axios from 'axios'
const apiRoot = process.env.REACT_APP_API_ROOT

export const setProfileImage = (file) => {
  console.log('hi there')
  console.log(file)

  const formData = new FormData();
  formData.append('image', file)

  console.log(formData)
  
  axios.post(apiRoot, formData)
    .then(res => {
      console.log(res)
    })
  return {
    type: ''
  }
}