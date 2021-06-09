// tslint:disable-next-line: import-name
import React, { useState, useEffect } from 'react';
import Router from 'next/router';
import Cookie from 'js-cookie';
import { decodedIdToken } from '../login/index';
import StyledSignUpContainer from './components/StyledSignUpContainer';
import StyledSignUpForm from './components/StyledSignUpForm';
import StyledInput from '../../components/StyledInput';
import StyledButton from '../../components/StyledButton';
import StyledSelect from '../../components/StyledSelect';
import StyledSignUpInputContainer from './components/StyledSignUpInputContainer';
import StyledSignUpTitle from './components/StyledSignUpTitle';

const USER_TOKEN = 'takeAwapp.token';
const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [givenName, setGivenName] = useState('');
  const [gender, setGender] = useState('');
  const [address, setAddress] = useState('');
  const [profile, setProfile] = useState('');
  const [userLoggedProfile, setUserLoggedProfile] = useState('');

  useEffect(() => {
    const token: string | null = localStorage.getItem(USER_TOKEN);
    if (token) {
      const tokenObject: decodedIdToken = JSON.parse(token);
      if (tokenObject.role === 'ADMIN') {
        setUserLoggedProfile(tokenObject.role);
      }
    }
  });

  const onCancelClick = () => {
    const token: string | null = localStorage.getItem(USER_TOKEN);
    if (token) {
      localStorage.removeItem(USER_TOKEN);
    }
    Router.push('/login');
  };

  const onSubmit = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    console.log('submit');
  };
  return (
    <StyledSignUpContainer>
      <StyledSignUpForm onSubmit={onSubmit}>
        <StyledSignUpTitle>Sign Up</StyledSignUpTitle>
        <StyledSignUpInputContainer>
          <StyledInput
            onChange={(event: any): void => setName(event.target.value)}
            placeholder={'Name'}
            type="text"
            value={name}
          />
          <StyledInput
            onChange={(event: any): void => setGivenName(event.target.value)}
            placeholder={'Given name'}
            type="text"
            value={givenName}
          />
          <StyledInput
            onChange={(event: any): void => setAddress(event.target.value)}
            placeholder={'Address'}
            type="text"
            value={address}
          />
          <StyledInput
            onChange={(event: any): void => setGender(event.target.value)}
            placeholder={'Gender'}
            value={gender}
          />
          <StyledInput
            onChange={(event: any): void => setEmail(event.target.value)}
            placeholder={'Email'}
            type="email"
            value={email}
          />
          <StyledInput
            onChange={(event: any): void => setPassword(event.target.value)}
            placeholder={'Password'}
            type="password"
            value={password}
          />
        </StyledSignUpInputContainer>
        {userLoggedProfile === 'ADMIN' ? (
          <StyledSelect
            id="profiles"
            onChange={(event: any): void => setProfile(event.target.value)}
            name="profiles"
          >
            <option value="customer">Customer</option>
            <option value="cooker">Cooker</option>
            <option value="order">Order</option>
            <option value="server">Server</option>
          </StyledSelect>
        ) : null}
        <StyledButton>Create</StyledButton>
        <StyledButton onClick={onCancelClick}>Cancel</StyledButton>
      </StyledSignUpForm>
    </StyledSignUpContainer>
  );
};

export default SignUp;
