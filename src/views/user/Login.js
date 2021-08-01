import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import LoginForm from '../../components/user/LoginForm.js';
import Footer from '../../components/template/Footer.js';

function Login() {
  return (
    <div>
      <LoginForm hrefForgotPassword='#' hrefRegister='/register' />
      {/* <Footer /> */}
    </div>
  );
};

export default Login;