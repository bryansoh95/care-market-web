import React, { useContext, useState, useReducer } from 'react';

const CredentialContext = React.createContext();
const CredentialDispatchContext = React.createContext();

const credentialInitialState = {
  caregiver: {},
  token: ''
};

const CredentialReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        caregiver: action.payload.caregiver,
        token: action.payload.token
      };
    default:
      return state;
  }
};

export function useCredentialContext() {
  const context = useContext(CredentialContext);
  return context;
}

export function useCredentialDispatch() {
  const context = useContext(CredentialDispatchContext);
  return context;
}

export function CredentialProvider({ children }) {
  const [credentialState, credentialDispatch] = useReducer(CredentialReducer, credentialInitialState);

  return (
    <CredentialContext.Provider value={credentialState}>
      <CredentialDispatchContext.Provider value={credentialDispatch}>
        {children}
      </CredentialDispatchContext.Provider>
    </CredentialContext.Provider>
  );
}

export async function loginCaregiver(dispatch, payload) {
  dispatch({ type: 'LOGIN', payload });
}