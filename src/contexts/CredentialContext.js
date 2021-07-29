import React, { useContext, useState } from 'react';

const CredentialContext = React.createContext();
const CredentialUpdateContext = React.createContext();

let currentCaregiver = {};
let currentToken = '';

export function useCredential() {
  return useContext(CredentialContext);
}

export function useCredentialUpdate(caregiver, token) {
  currentCaregiver = caregiver;
  currentToken = token;
  return useContext(CredentialUpdateContext);
}

export function CredentialProvider({ children }) {
  const [credential, setCredential] = useState({
    caregiver: {},
    token: ''
  });

  function updateCredential() {
    setCredential(currentCredential => ({
      ...currentCredential,
      caregiver: currentCaregiver,
      token: currentToken
    }));

    currentCaregiver = {};
    currentToken = '';
  }

  return (
    <CredentialContext.Provider value={credential}>
      <CredentialUpdateContext.Provider value={updateCredential}>
        {children}
      </CredentialUpdateContext.Provider>
    </CredentialContext.Provider>
  );
}