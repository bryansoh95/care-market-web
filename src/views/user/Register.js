import React, { useState, useContext, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useCredentialContext } from '../../contexts/CredentialContext';
import { useSessionStorage } from '../../common/helpers/SessionStorageHelper';
import RegistrationForm from '../../components/user/RegistrationForm';

const Register = () => {
  const credential = useCredentialContext();
  return (
    <div>
      <RegistrationForm />
    </div>
  );
};

export default Register;