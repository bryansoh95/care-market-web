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
    isBefriender: Yup.bool().notRequired(),
    isMedicalEscort: Yup.bool().notRequired(),
    isNurse: Yup.bool().notRequired()
  });

  const { register, handleSubmit, reset, setError, getValues, setValue, formState } = useForm({ resolver: yupResolver(validationSchema) });
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
    console.log('current gender: ' + getValues('gender'))
  }

  return (
    <div>
      <Container>
        <Row>
          <Col>
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
                      <FormGroup className={`form-control ${errors.firstName ? 'is-invalid' : ''}`}>
                        <Label for='gender'><p>Gender</p></Label>
                        <Label>
                          Male
                          <Input
                            {...register('gender')}
                            type='radio'
                            name='gender'
                            value='male'
                            onChange={onChangeGender}
                            checked={getValues('gender')}
                          />
                        </Label>
                        <Label>
                          Female
                          <Input
                            {...register('gender')}
                            type='radio'
                            name='gender'
                            value='female'
                            onChange={onChangeGender}
                            checked={getValues('gender')}
                          />
                        </Label>
                      </FormGroup>
                    </Col>
                  </Row>
                  
                  <FormGroup style={{textAlign: 'center'}}>
                    <Button type='submit'><p>Sign In</p></Button>
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