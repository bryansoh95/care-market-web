import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import axios from 'axios';
import '../stylesheets/css/bootstrap.css';
import '../../node_modules/@fortawesome/fontawesome-free/css/all.css';

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

function LoginForm() {
  const history = useHistory();

  const validationSchema = Yup.object().shape({
    email: Yup.string().required('Email is required'),
    password: Yup.string().required('Password is required')
  });
  const { register, handleSubmit, reset, setError, setValue, formState } = useForm({ resolver: yupResolver(validationSchema) });
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
      setError('errorServerSide', { type: 'manual', message: error.response.data })
      setValue('email', '')
      setValue('password', '')
      document.getElementById('signInForm').reset();
    });
  }

  const onChangeEmail = e => {
    setValue('email', e.target.value)
  }
  const onChangePassword = e => {
    setValue('password', e.target.value)
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
                    <Input
                      {...register('email')}
                      className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                      type='email'
                      onChange={onChangeEmail}
                      onBlur={onChangeEmail}
                      onKeyDown={onChangeEmail}
                    />
                    <div className='invalid-feedback'>{errors.email?.message}</div>
                  </FormGroup>
                  <FormGroup>
                    <Label for='password'>Password</Label>
                    <Input
                      {...register('password')}
                      className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                      name='password'
                      type='password'
                      onChange={onChangePassword}
                    />
                    <div className='invalid-feedback'>{errors.password?.message}</div>
                  </FormGroup>
                  <FormGroup>
                    <Button type='submit'>Sign In</Button>
                  </FormGroup>
                  <div className='alert alert-danger' style={{display: errors.errorServerSide? 'block' : 'none' }}><i class="fas fa-exclamation-triangle"></i> {errors.errorServerSide?.message}</div>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default LoginForm;