import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import { CredentialProvider } from './contexts/CredentialContext';

import Login from './views/user/Login.js';
import Register from './views/user/Register.js';

function App() {
  return (
    <CredentialProvider>
      <Router>
        <Switch>
          <Route exact path='/register'>
            <Register />
          </Route>
          <Route exact path='/'>
            <Login />
          </Route>
        </Switch>
      </Router>
    </CredentialProvider>
  );
};

export default App;