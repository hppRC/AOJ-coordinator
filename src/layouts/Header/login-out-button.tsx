import firebase from 'firebase/app';
import React from 'react';
import { FirebaseAuthContainer, SwitchContainer } from 'src/store';

import styled from '@emotion/styled';

const LogInOutButton: React.FCX = ({ className }) => {
  const { setOpen } = SwitchContainer.useContainer();
  const { user } = FirebaseAuthContainer.useContainer();

  const handleLogin = () => {
    setOpen(true);
  };

  const handleLogout = () => {
    firebase.auth().signOut();
  };

  // userがログインしているならLogoutボタンを、ログアウト状態ならログインボタンを出す
  return (
    <>
      {user ? (
        <button onClick={handleLogout} className={className}>
          log out
        </button>
      ) : (
        <button onClick={handleLogin} className={className}>
          log in
        </button>
      )}
    </>
  );
};

export const StyledLogInOutButton = styled(LogInOutButton)`
  color: #ffffff;
  cursor: pointer;
`;

export default LogInOutButton;
