// tslint:disable-next-line: import-name
import React, { useState } from 'react';
import Router from 'next/router';
import jwtDecode from 'jwt-decode';
import Link from 'next/link';
import axios, { AxiosRequestConfig } from 'axios';
import StyledLoginContiner from './components/StyledLoginContainer';
import StyledLoginInput from './components/StyledLoginForm';
import StyledLoginTitle from './components/StyledLoginTitle';
import StyledInput from '../../components/StyledInput';
import StyledButton from '../../components/StyledButton';
import StyledLink from '../../components/StyledLink';
import StyledLoginInputContainer from './components/StyledLoginInputContainer';

export interface decodedIdToken {
  exp: number;
  name: string;
  role: string;
  sub: string;
}

const USER_TOKEN = 'takeAwapp.token';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const onSubmit = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    const requestConfig = {
      baseURL: 'http://localhost:8080',
      config: {
        timeout: 30000,
      },
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      timeout: 30000,
    } as AxiosRequestConfig;
    const http = axios.create(requestConfig);
    http
      .post(
        '/login',
        JSON.stringify({
          email: email,
          password: password,
        })
      )
      .then(({ status, headers }) => {
        if (status === 200) {
          const decoded: decodedIdToken = jwtDecode(headers.authorization);
          localStorage.setItem(USER_TOKEN, JSON.stringify(decoded));
          if (decoded.role === 'ADMIN') {
            Router.push('/signup');
          } else {
            Router.push('/');
          }
        }
      })
      .catch((error) => error);
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
