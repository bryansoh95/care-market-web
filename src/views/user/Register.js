import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useCredential } from '../../contexts/CredentialContext';

function Login() {
  const credential = useCredential();
  return (
    <div>
      <p>Sample {credential.token}</p>
    </div>
  );
};

export default Login;