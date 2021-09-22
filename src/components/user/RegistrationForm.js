import React, { useState, useContext } from 'react';
import { Link, NavLink, useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import '../../stylesheets/css/bootstrap.css';
import '../../stylesheets/main.css';
import '../../../node_modules/@fortawesome/fontawesome-free/css/all.css';
import * as APICalls from '../../APICalls';
import * as Constants from '../../common/Constants';
import { Button, Card, CardBody, Col, Container, Form, FormGroup, Input, Label, Row } from 'reactstrap';

const RegistrationForm = () => {
  const validationSchema = Yup.object().shape({
    firstName: Yup.string().required('First name is required'),
    lastName: Yup.string().required('Last name is required'),
    gender: Yup.string().required('Gender is required'),
    race: Yup.string().required('Race is required'),
    mobileNumber: Yup.string().required('Mobile number is required'),
    email: Yup.string().required('Email is required').email('Email is invalid'),
    password: Yup.string().required('Password is required'),
    confirmPassword: Yup.string().required('Please confirm password').oneOf([Yup.ref('password'), null], 'Passwords must match'),
    job: Yup.string().required('Job required'),
    isBefriender: Yup.bool().notRequired(),
    isMedicalEscort: Yup.bool().notRequired(),
    isNurse: Yup.bool().notRequired()
  });

  const { register, handleSubmit, setValue, formState } = useForm({ resolver: yupResolver(validationSchema) });
  const { errors } = formState;

  const registerUser = data => {};

  const onChangeFirstName = e => {
    setValue('firstName', e.target.value);
  };
  const onChangeLastName = e => {
    setValue('lastName', e.target.value);
  };
  const onChangeGender = e => {
    setValue('gender', e.target.value);
  };
  const onChangeRace = e => {
    setValue('race', e.target.value);
  };
  const onChangeEmail = e => {
    setValue('email', e.target.value);
  };
  const onChangeMobileNumber = e => {
    setValue('mobileNumber', e.target.value);
  };
  const onChangePassword = e => {
    setValue('password', e.target.value);
  };
  const onChangeConfirmPassword = e => {
    setValue('confirmPassword', e.target.value);
  };
  const onChangeJob = () => {
    const jobElementOptions = document.getElementById('job').options;
    for (const option of jobElementOptions) {
      if (option.selected) {
        setValue(option.value, true);
      } else {
        setValue(option.value, false);
      }
    }
  };

  return (
    <div>
      <Container>
        <Row>
          <Col sm='10'>
            <Card>
              <CardBody>
                <div style={{textAlign: 'center', marginBottom: '20px'}}><h1>Registration</h1></div>
                <Form id='registrationForm' onSubmit={handleSubmit(register)}>
                  <Row>
                    <Col xs='12' sm='6'>
                      <FormGroup>
                        <Label for='firstName'><p>First Name</p></Label>
                        <Input
                          {...register('firstName')}
                          className={`form-control ${errors.firstName ? 'is-invalid' : ''}`}
                          id='firstName'
                          type='text'
                          onChange={onChangeFirstName}
                          onBlur={onChangeFirstName}
                          onKeyDown={onChangeFirstName}
                        />
                        <div className='invalid-feedback'>{errors.firstName?.message}</div>
                      </FormGroup>
                    </Col>
                    <Col xs='12' sm='6'>
                      <FormGroup>
                        <Label for='lastName'><p>Last Name</p></Label>
                        <Input
                          {...register('lastName')}
                          className={`form-control ${errors.firstName ? 'is-invalid' : ''}`}
                          id='lastName'
                          type='text'
                          onChange={onChangeLastName}
                          onBlur={onChangeLastName}
                          onKeyDown={onChangeLastName}
                        />
                        <div className='invalid-feedback'>{errors.lastName?.message}</div>
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col xs='12' sm='3'>
                      <Label for='gender'><p>Gender</p></Label>
                      <Input
                        {...register('gender')}
                        className={`form-select ${errors.gender ? 'is-invalid' : ''}`}
                        id='gender'
                        type='select'
                        onChange={onChangeGender}
                      >
                        <option selected disabled value=''>---Select gender---</option>
                        <option value={Constants.Gender.FEMALE}>Female</option>
                        <option value={Constants.Gender.MALE}>Male</option>
                        <option value={Constants.Gender.OTHERS}>Others</option>
                      </Input>
                      <div className='invalid-feedback'>{errors.gender?.message}</div>
                    </Col>
                    <Col xs='12' sm='3'>
                      <Label for='race'><p>Race</p></Label>
                      <Input
                        {...register('race')}
                        className={`form-select ${errors.race ? 'is-invalid' : ''}`}
                        id='race'
                        type='select'
                        onChange={onChangeRace}
                      >
                        <option selected disabled value=''>---Select race---</option>
                        <option value={Constants.Race.CHINESE}>Chinese</option>
                        <option value={Constants.Race.EURASIAN}>Eurasian</option>
                        <option value={Constants.Race.INDIAN}>Indian</option>
                        <option value={Constants.Race.MALAY}>Malay</option>
                        <option value={Constants.Race.OTHERS}>Others</option>
                      </Input>
                      <div className='invalid-feedback'>{errors.race?.message}</div>
                    </Col>
                    <Col xs='12' sm='3'>
                      <FormGroup>
                        <Label for='email'><p>Email</p></Label>
                        <Input
                          {...register('email')}
                          className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                          id='email'
                          type='text'
                          onChange={onChangeEmail}
                          onBlur={onChangeEmail}
                          onKeyDown={onChangeEmail}
                        />
                        <div className='invalid-feedback'>{errors.email?.message}</div>
                      </FormGroup>
                    </Col>
                    <Col xs='12' sm='3'>
                      <FormGroup>
                        <Label for='mobileNumber'><p>Mobile Number</p></Label>
                        <Input
                          {...register('mobileNumber')}
                          className={`form-control ${errors.mobileNumber ? 'is-invalid' : ''}`}
                          id='mobileNumber'
                          type='text'
                          onChange={onChangeMobileNumber}
                          onBlur={onChangeMobileNumber}
                          onKeyDown={onChangeMobileNumber}
                        />
                        <div className='invalid-feedback'>{errors.mobileNumber?.message}</div>
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col xs='12' sm='3'>
                      <Label for='password'><p>Password</p></Label>
                      <Input
                        {...register('password')}
                        className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                        id='password'
                        type='password'
                        onChange={onChangePassword}
                        onBlur={onChangePassword}
                        onKeyDown={onChangePassword}
                      />
                      <div className='invalid-feedback'>{errors.password?.message}</div>
                    </Col>
                    <Col xs='12' sm='3'>
                      <Label for='confirmPassword'><p>Confirm Password</p></Label>
                      <Input
                        {...register('confirmPassword')}
                        className={`form-control ${errors.confirmPassword ? 'is-invalid' : ''}`}
                        id='confirmPassword'
                        type='password'
                        onChange={onChangeConfirmPassword}
                        onBlur={onChangeConfirmPassword}
                        onKeyDown={onChangeConfirmPassword}
                      />
                      <div className='invalid-feedback'>{errors.confirmPassword?.message}</div>
                    </Col>
                    <Col xs='12' sm='3'>
                      <Label for='job'><p>Job</p></Label>
                      <Input
                        {...register('job')}
                        className={`form-select ${errors.job ? 'is-invalid' : ''} registration-form-select-multiple`}
                        id='job'
                        type='select'
                        onChange={onChangeJob}
                        multiple
                      >
                        <option value='isBefriender'>Befriender</option>
                        <option value='isMedicalEscort'>Medical Escort</option>
                        <option value='isNurse'>Nurse</option>
                      </Input>
                      <div className='invalid-feedback'>{errors.job?.message}</div>
                    </Col>
                  </Row>
                  <FormGroup style={{textAlign: 'center'}}>
                    <Button type='submit'><p>Register</p></Button>
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

export default RegistrationForm;