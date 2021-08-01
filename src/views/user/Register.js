import React, { useState, useContext, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useCredentialContext } from '../../contexts/CredentialContext';
import { useSessionStorage } from '../../common/helpers/SessionStorageHelper';
import * as Constants from '../../common/Constants';

const Register = () => {
  const [caregiver, setCaregiver] = useSessionStorage(Constants.SessionStorageKeys.CAREGIVER);
  const [token, setToken] = useSessionStorage(Constants.SessionStorageKeys.TOKEN);

  const credential = useCredentialContext();
  return (
    <div>
    </div>
  );
};

export default Register;