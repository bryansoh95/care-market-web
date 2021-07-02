import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import LoginForm from '../../components/LoginForm.js';

function Login() {
  return (
    <div>
      <LoginForm />
    </div>
  );
};

export default Login;