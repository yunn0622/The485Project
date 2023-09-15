import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Button } from '@aws-amplify/ui-react';
import './style.css';

const LoginButton = () => {
  const { isAuthenticated, loginWithRedirect, logout } = useAuth0();
  console.log('isAuthenticated:', isAuthenticated);

  const buttonText = isAuthenticated ? "Log Out" : "Log In";
  const buttonClickHandler = isAuthenticated ? logout : loginWithRedirect;

  return (
    <div className="login-button-container">
        <Button className="login-button" onClick={buttonClickHandler}>
            {buttonText}
        </Button>
    </div>
  );
};

export default LoginButton;
