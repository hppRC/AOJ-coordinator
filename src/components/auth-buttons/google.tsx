import 'firebase/auth';

import firebase from 'firebase/app';
import React from 'react';

import styled from '@emotion/styled';

const GoogleAuthButton: React.FCX = ({ className }) => {
  const provider = new firebase.auth.GoogleAuthProvider();
  const onClick = async () => {
    try {
      await firebase.auth().signInWithPopup(provider);
    } catch (error) {
      console.log('please login before using AOJ coordinator');
    }
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
