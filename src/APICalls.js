import axios from 'axios';

const api = 'http://localhost:5000';

// Login Form
export const caregiverLogin = (email, password) => {
  return axios.post(`${api}/caregiver/login`, {
    email,
    password
  })
    .then(response => response.data)
    .catch(error => {
      throw error;
    });
}