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
import { Card, CardBody, Col, Container, Form, FormGroup, Input, Label, Row } from 'reactstrap';

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

  const { register, handleSubmit, reset, setError, setValue, formState } = useForm({ resolver: yupResolver(validationSchema) });
  const { errors } = formState;

  const registerUser = data => {};

  const onChangeFirstName = e => {
    setValue('firstName', e.target.value);
  };

  return (
    <div>
      <Container>
        <Row>
          <Col xs='12' sm='6'>
            <Card>
              <CardBody>
                <div style={{textAlign: 'center', marginBottom: '20px'}}><h1>Registration</h1></div>
                <Form id='registrationForm' onSubmit={handleSubmit(register)}>
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