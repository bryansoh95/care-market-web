import axios from 'axios';

const api = 'http://localhost:5000';

// Registration Form
export const caregiverRegister = (firstName, lastName, gender, race, mobileNumber, email, password) => {
  return axios.post(`${api}/caregiver`, {
    first_name: firstName,
    last_name: lastName,
    gender,
    race,
    mobile_number: mobileNumber,
    email,
    password
  })
    .then(response => response.data)
    .catch(error => {
      throw error;
    });
}

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