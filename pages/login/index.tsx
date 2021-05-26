// tslint:disable-next-line: import-name
import React, { useState } from 'react';
import Link from 'next/link';
import Router from 'next/router';
import Cookie from 'js-cookie';
import jwtDecoded from 'jwt-decode';
import {
  AuthenticationDetails,
  CognitoUser,
  CognitoUserPool,
  ICognitoUserData,
} from 'amazon-cognito-identity-js';
import StyledLoginContiner from './components/StyledLoginContainer';
import StyledLoginInput from './components/StyledLoginForm';
import StyledLoginTitle from './components/StyledLoginTitle';
import StyledInput from '../../components/StyledInput';
import StyledButton from '../../components/StyledButton';
import StyledLink from '../../components/StyledLink';
import StyledLoginInputContainer from './components/StyledLoginInputContainer';

export interface decodedIdToken {
  email: string;
  name: string;
  profile: string;
}

const userPool = new CognitoUserPool({
  ClientId: '',
  UserPoolId: '',
});

const Login = () => {
  const [email, setEmail] = useState('rafaelpedcustodio@gmail.com');
  const [password, setPassword] = useState('C451z2#$');
  const onSubmit = (event: { preventDefault: () => void }) => {
    event.preventDefault();

    const data: ICognitoUserData = {
      Pool: userPool,
      Username: email,
    };

    const user = new CognitoUser(data);
    const authDetails = new AuthenticationDetails({
      Password: password,
      Username: email,
    });

    user.authenticateUser(authDetails, {
      onSuccess: (data, result) => {
        console.log(result);
        const ID_USER_TOKEN = 'takeAwapp.idToken';
        const ACCESS_USER_TOKEN = 'takeAwapp.accessToken';
        const acessToken = data.getAccessToken();
        const idToken = data.getIdToken();
        console.log(data);
        Cookie.set(ID_USER_TOKEN, idToken);
        Cookie.set(ACCESS_USER_TOKEN, acessToken);
        const decodedIdToken: decodedIdToken = jwtDecoded(
          data.getIdToken().getJwtToken()
        ) as decodedIdToken;
        if (decodedIdToken.profile === 'Admin') {
          Router.push('/signup');
        } else {
          Router.push('/');
        }
      },

      onFailure: (err) => {
        console.error('onFailure:', err);
      },

      newPasswordRequired: (data) => {
        console.log('newPasswordRequired:', data);
      },
    });
  };
  return (
    <StyledLoginContiner>
      <StyledLoginTitle>Login</StyledLoginTitle>
      <StyledLoginInput onSubmit={onSubmit}>
        <StyledLoginInputContainer>
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
        </StyledLoginInputContainer>
        <StyledButton type="submit">Login</StyledButton>
      </StyledLoginInput>
      <StyledLink>
        <Link href="/signup">Sign up</Link>
      </StyledLink>
    </StyledLoginContiner>
  );
};

export default Login;
