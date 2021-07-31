import React, { useState, useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useCredentialContext } from '../../contexts/CredentialContext';

function Register() {
  const credential = useCredentialContext();
  return (
    <div>
      <p>Sample {credential.token}</p>
    </div>
  );
};

export default Register;