import 'firebase/auth';

import firebase from 'firebase/app';
import React from 'react';

import styled from '@emotion/styled';

const GoogleAuthButton: React.FCX = ({ className }) => {
  const provider = new firebase.auth.GoogleAuthProvider();
  const onClick = () => {
    firebase.auth().signInWithPopup(provider);
  };

  return (
    <button className={className} onClick={onClick}>
      log in
    </button>
  );
};

export const StyledGoogleAuthButton = styled(GoogleAuthButton)`
  border: solid 1px #000;
`;

export default StyledGoogleAuthButton;
