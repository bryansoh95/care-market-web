import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
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
    Form,
    FormGroup,
    Input,
    Label,
    Row
} from 'reactstrap';

function Login() {
  const history = useHistory();

  const [passwordError, setPasswordError] = useState('');
  const [isError, toggleError] = useState(false);

  const validationSchema = Yup.object().shape({
    email: Yup.string().required('Email is required'),
    password: Yup.string().required('Password is required')
  });
  const { register, handleSubmit, reset, getValues, setValue, formState } = useForm({ resolver: yupResolver(validationSchema) });
  const { errors } = formState;

  const signIn = data => {
    axios.post(`http://localhost:5000/caregiver/login`, {
      email: data.email,
      password: data.password
    })
    .then(response => {
      document.getElementById('signInForm').reset();
      reset();
      console.log(JSON.stringify(response.data.token))
    })
    .catch(error => {
      document.getElementById('signInForm').reset();
      reset();
      console.log(error.response.data)
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
                <Form id='signInForm' onSubmit={handleSubmit(signIn)}>
                  <FormGroup>
                    <Label for='email'>Email</Label>
                    <Input type='email' {...register('email')} />
                    <div>{errors.email?.message}</div>
                  </FormGroup>
                  <FormGroup>
                    <Label for='password'>Password</Label>
                    <Input type='password' {...register('password')} />
                    <div>{errors.password?.message}</div>
                  </FormGroup>
                  <FormGroup>
                    <Button type='submit'>Sign In</Button>
                    <Button type='reset'>Reset</Button>
                  </FormGroup>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Login;