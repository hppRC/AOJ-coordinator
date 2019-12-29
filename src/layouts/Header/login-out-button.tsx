import firebase from 'firebase/app';
import React from 'react';
import { AOJContainer, FirebaseAuthContainer, SwitchContainer } from 'src/store';

import styled from '@emotion/styled';

const LogInOutButton: React.FCX = ({ className }) => {
  const { setOpen } = SwitchContainer.useContainer();
  const { user } = FirebaseAuthContainer.useContainer();
  const { aojUser } = AOJContainer.useContainer();

  const handleLogin = () => {
    setOpen(true);
  };

  const handleLogout = () => {
    firebase.auth().signOut();
  };

  // userがログインしているならLogoutボタンを、ログアウト状態ならログインボタンを出す
  return (
    <div className={className}>
      {user ? (
        <button onClick={handleLogout}>log out</button>
      ) : (
        <button onClick={handleLogin}>log in</button>
      )}
      <h2>{aojUser?.id}</h2>
    </div>
  );
};

export const StyledLogInOutButton = styled(LogInOutButton)`
  h2 {
    display: inline-block;
    padding-left: 1rem;
  }
  button {
    display: inline-block;
    color: #ffffff;
    padding: 0.2rem 0;
    cursor: pointer;

    transition: opacity 0.3s;

    :hover {
      opacity: 0.6;
    }
  }
`;

export default LogInOutButton;
