import React, { useState } from 'react';
import { useAppDispatch } from 'store/hooks';
import { authenticationActions } from 'store/slices/authentication';
import Input from '../../components/AuthInput/AuthInput';
import {
  Button,
  Fieldset,
  Form,
  FormContainer,
  LoginContainer,
  Title
} from 'components/commonStyles';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';

const Signup = () => {
  const dispatch = useAppDispatch();
  const { register, handleSubmit } = useForm({
    defaultValues: {
      fullName: '',
      email: '',
      nickname: '',
      password: '',
      confirmPassword: ''
    }
  });
  const submit = (data: any) => {
    dispatch(
      authenticationActions.signupStart({
        nickname: data.nickname,
        fullName: data.fullName,
        email: data.email,
        password: data.password
      })
    );
  };

  return (
    <LoginContainer>
      <Title>Signup</Title>
      <Form onSubmit={handleSubmit(submit)}>
        <FormContainer>
          <Fieldset>
            <Input label="Full Name" type="text" {...register('fullName')} />
            <Input label="Email" type="text" {...register('email')} />
            <Input label="Nickname" type="text" {...register('nickname')} />
            <Input label="Password" type="password" {...register('password')} />
            <Input label="Confirm Password" type="password" {...register('confirmPassword')} />
          </Fieldset>
          <Button type="submit">Create an account</Button>
          <p>
            Already have an account? <Link to="/login">Login</Link>
          </p>
        </FormContainer>
      </Form>
    </LoginContainer>
  );
};

export default Signup;
