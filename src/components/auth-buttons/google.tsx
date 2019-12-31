import 'firebase/auth';

import firebase from 'firebase/app';
import React from 'react';
import GoogleButtonLight from 'src/images/google-button-dark.png';

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
  //このボタン画像のキャッシュが効いてない
  return (
    <button className={className} onClick={onClick}>
      Login with Google
      <img src={GoogleButtonLight} alt='google authentication button' />
    </button>
  );
};

export const StyledGoogleAuthButton = styled(GoogleAuthButton)`
  position: relative;

  img {
    width: 200px;
    transition: all 0.3s;
  }

  ::before {
    content: '';
    display: block;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: #000113;
    border-radius: 5px;
    opacity: 0;
    transition: all 0.2s ease;
  }

  :hover::before {
    opacity: 0.3;
  }
`;

export default StyledGoogleAuthButton;
