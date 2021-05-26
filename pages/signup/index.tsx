// tslint:disable-next-line: import-name
import React, { useState, useEffect } from 'react';
import Router from 'next/router';
import Cookie from 'js-cookie';
import jwtDecoded from 'jwt-decode';
import {
  CognitoUserPool,
  CognitoUserAttribute,
} from 'amazon-cognito-identity-js';
import { decodedIdToken } from '../login/index';
import StyledSignUpContainer from './components/StyledSignUpContainer';
import StyledSignUpForm from './components/StyledSignUpForm';
import StyledInput from '../../components/StyledInput';
import StyledButton from '../../components/StyledButton';
import StyledSelect from '../../components/StyledSelect';
import StyledSignUpInputContainer from './components/StyledSignUpInputContainer';
import StyledSignUpTitle from './components/StyledSignUpTitle';

const ID_USER_TOKEN = 'takeAwapp.idToken';
const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [givenName, setGivenName] = useState('');
  const [gender, setGender] = useState('');
  const [address, setAddress] = useState('');
  const [profile, setProfile] = useState('');
  const [userLoggedProfile, setUserLoggedProfile] = useState('');
  const poolData = {
    ClientId: '',
    UserPoolId: '',
  };
  const userPool = new CognitoUserPool(poolData);

  useEffect(() => {
    const token: string | undefined = Cookie.get(ID_USER_TOKEN);
    if (token) {
      const decodedIdToken: decodedIdToken = jwtDecoded(
        token
      ) as decodedIdToken;
      setUserLoggedProfile(decodedIdToken.profile);
    }
  });

  const onCancelClick = () => {
    const accessToken = Cookie.get('takeAwapp.accessToken');
    const idToken = Cookie.get('takeAwapp.idToken');
    if (accessToken && idToken) {
      Cookie.remove('takeAwapp.accessToken');
      Cookie.remove('takeAwapp.idToken');
    }
    Router.push('/login');
  };

  const onSubmit = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    const attributes = [
      new CognitoUserAttribute({ Name: 'address', Value: address }),
      new CognitoUserAttribute({ Name: 'gender', Value: gender }),
      new CognitoUserAttribute({ Name: 'name', Value: name }),
      new CognitoUserAttribute({ Name: 'given_name', Value: givenName }),
      new CognitoUserAttribute({
        Name: 'profile',
        Value: userLoggedProfile === 'Admin' ? profile : 'Customer',
      }),
    ];
    if (profile !== 'Admin') {
      Router.push('/home');
    }
    userPool.signUp(email, password, attributes, [], (err, data) => {
      if (err) console.log(err);
      console.log(data);
    });
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
        {userLoggedProfile === 'Admin' ? (
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
