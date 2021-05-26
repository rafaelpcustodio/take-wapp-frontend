import React from 'react';
import Cookie from 'js-cookie';
import { useRouter } from 'next/router';

const withAuth = (WrappedComponent: any) => {
  return (props: any) => {
    if (typeof window !== 'undefined') {
      const Router = useRouter();
      const accessToken = Cookie.get('takeAwapp.accessToken');
      if (!accessToken) {
        Router.replace('/login');
        return null;
      }
      return <WrappedComponent {...props} />;
    }
    return null;
  };
};

export default withAuth;
