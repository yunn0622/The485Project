import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Button } from '@aws-amplify/ui-react';

const LoginButton = () => {
  const { isAuthenticated, loginWithRedirect, logout } = useAuth0();
  console.log('isAuthenticated:', isAuthenticated);

  const buttonStyle = {
    position: 'absolute',
    top: '20px',
    right: '50px',
  };

  if (isAuthenticated) {
    return <Button style={buttonStyle} onClick={() => logout()}>Log Out</Button>;
  } else {
    return <Button style={buttonStyle} onClick={() => loginWithRedirect()}>Log In</Button>;
  }
};

export default LoginButton;
