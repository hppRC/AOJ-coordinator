import 'firebase/auth';

import firebase from 'firebase/app';
import React, { useState } from 'react';
import { animated, config, useSpring } from 'react-spring';
import GoogleButtonLight from 'src/images/google-button-dark.png';
import { commonButtonStyle } from 'src/styles/common-button';

import styled from '@emotion/styled';

const GoogleAuthButton: React.FCX = ({ className }) => {
  const [enter, setEnter] = useState(false);
  const spring = useSpring({
    config: config.wobbly,
    width: enter ? '30rem' : '25rem'
  });

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
    <animated.button
      className={className}
      onClick={onClick}
      onMouseEnter={_ => setEnter(true)}
      onMouseLeave={_ => setEnter(false)}
      style={spring}
    >
      <img src={GoogleButtonLight} alt='google authentication button' />
    </animated.button>
  );
};

export const StyledGoogleAuthButton = styled(GoogleAuthButton)`
  position: relative;
  width: 25rem;
  height: auto;

  img {
    width: 100%;
  }

  ${commonButtonStyle}
`;

export default StyledGoogleAuthButton;
