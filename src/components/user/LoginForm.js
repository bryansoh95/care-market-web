import React, { useState, useContext } from 'react';
import { Link, NavLink, useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import axios from 'axios';
import '../../stylesheets/css/bootstrap.css';
import '../../stylesheets/main.css'
import '../../../node_modules/@fortawesome/fontawesome-free/css/all.css'
import { useSessionStorage } from '../../common/helpers/SessionStorageHelper';
import { useCredentialContext, useCredentialDispatch, loginCaregiver } from '../../contexts/CredentialContext';
import * as APICalls from '../../APICalls';
import * as Constants from '../../common/Constants';

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

function LoginForm(props) {
  const { hrefForgotPassword, hrefRegister } = props;
  const [caregiver, setCaregiver] = useSessionStorage(Constants.SessionStorageKeys.CAREGIVER);
  const [token, setToken] = useSessionStorage(Constants.SessionStorageKeys.TOKEN);
  const history = useHistory();
  const credentialDispatch = useCredentialDispatch();

  const validationSchema = Yup.object().shape({
    email: Yup.string().required('Email is required'),
    password: Yup.string().required('Password is required')
  });
  const { register, handleSubmit, reset, setError, setValue, formState } = useForm({ resolver: yupResolver(validationSchema) });
  const { errors } = formState;

  const signIn = data => {
    APICalls.caregiverLogin(data.email, data.password)
      .then(response => {
        document.getElementById('signInForm').reset();
        reset();
        setCaregiver(response.caregiver);
        setToken(response.token);
        loginCaregiver(credentialDispatch, { caregiver: response.caregiver, token: response.token });
      })
      .catch(error => {
        console.log(error)
        setError('errorServerSide', { type: 'manual', message: error.response.data })
        setValue('email', '')
        setValue('password', '')
        document.getElementById('signInForm').reset();
      });
  };
  
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
              <CardBody>
                <div style={{textAlign: 'center', marginBottom: '20px'}}><h1>Welcome to Care Market</h1></div>
                <Form id='signInForm' onSubmit={handleSubmit(signIn)}>
                  <FormGroup>
                    <Label for='email'><p>Email</p></Label>
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
                    <Label for='password'><p style={{margin: '10px 0px 0px'}}>Password</p></Label>
                    <Input
                      {...register('password')}
                      className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                      name='password'
                      type='password'
                      onChange={onChangePassword}
                    />
                    <div className='invalid-feedback col-6'>{errors.password?.message}</div>
                    <div style={{textAlign: 'right', fontSize: '10px'}}><NavLink to={hrefForgotPassword}><p>Forgot Password</p></NavLink></div>
                  </FormGroup>
                  <FormGroup style={{textAlign: 'center'}}>
                    <Button type='submit'><p>Sign In</p></Button>
                  </FormGroup>
                  <div className='alert alert-danger' style={{display: errors.errorServerSide? 'block' : 'none' }}><i class="fas fa-exclamation-triangle"></i>
                    &nbsp;{errors.errorServerSide?.message}</div>
                </Form>
                <div style={{textAlign: 'center', marginTop: '10px'}}><p>Don't have an account? <NavLink to={hrefRegister}>Register Here</NavLink></p></div>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default LoginForm;