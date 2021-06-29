import React, { useState } from 'react';
import { render } from 'react-dom';
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';
import '../../stylesheets/css/bootstrap.css';

import {
    Button,
    Card,
    CardBody,
    CardHeader,
    CardTitle,
    Col,
    Container,
    FormGroup,
    Input,
    Label,
    Row
} from 'reactstrap';

function Login() {
  const history = useHistory();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isError, toggleError] = useState(false);

  const onChangeEmail = e => {
    setEmail(e.target.value);
  };
  const onChangePassword = e => {
    setPassword(e.target.value);
  };

  const signIn = e => {
    e.preventDefault();

    console.log('p[ressed')
    axios.post(`http://localhost:5000/caregiver/login`, {
      email: email,
      password: password
    })
    .then(response => {
      console.log(JSON.stringify(response.data.token))
    });
  }

  return (
    <div>
      <Container>
        <Row>
          <Col xs="12" sm="6"></Col>
          <Col xs ="12" sm="6">
            <Card>
              <CardHeader>
                <CardTitle>Welcome to Care Market</CardTitle>
              </CardHeader>
              <CardBody>
                <FormGroup>
                  <Label for='email'>Email</Label>
                  <Input type='email' name='email' id='email' value={email} onChange={onChangeEmail} required />
                </FormGroup>
                <FormGroup>
                  <Label for='password'>Password</Label>
                  <Input type='password' name='password' id='password' value={password} onChange={onChangePassword} required />
                </FormGroup>
                <FormGroup>
                  <Button type='submit' onClick={signIn}>Sign In</Button>
                </FormGroup>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Login;

render(<Login />, document.getElementById("root"));