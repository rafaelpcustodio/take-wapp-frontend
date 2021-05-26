// tslint:disable-next-line: import-name
import React from 'react';
import withAuth from '../src/components/auth/WithAuth';
import axios from 'axios';
import Cookie from 'js-cookie';

const ID_USER_TOKEN = 'takeAwapp.accessToken';

const onClick = () => {
  console.log(Cookie.getJSON('takeAwapp.accessToken').payload);
  const http = axios.create({
    baseURL: 'http://localhost:8080',
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${Cookie.getJSON('takeAwapp.idToken')}`,
      'Content-Type': 'application/json',
    },
    timeout: 30000,
  });
  http
    .get('/hello')
    .then(({ data, status }) => {
      console.log(status);
      console.log(data);
    })
    .catch((error) => console.log(error));
};

const Home = () => {
  return (
    <div>
      <div>Make the test request here</div>
      <button onClick={onClick}>You are logged</button>
    </div>
  );
};

export default withAuth(Home);
