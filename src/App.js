import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Login from './views/user/Login.js';
import Register from './views/user/Register.js';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path='/register' component={Register} />
        <Route exact path='/' component={Login} />
      </Switch>
    </Router>
  );
};

export default App;