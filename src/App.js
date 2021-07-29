import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import { CredentialProvider } from './contexts/CredentialContext';

import Login from './views/user/Login.js';
import Register from './views/user/Register.js';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path='/register'>
          <CredentialProvider>
            <Register />
          </CredentialProvider>
        </Route>
        <Route exact path='/' component={Login} />
      </Switch>
    </Router>
  );
};

export default App;