import 'firebase/auth';

import firebase from 'firebase/app';
import React, { useState } from 'react';
import { animated, config, useSpring } from 'react-spring';
import { commonButtonStyle } from 'src/styles';

import styled from '@emotion/styled';

const GitHubAuthButton: React.FCX = ({ className }) => {
  const [enter, setEnter] = useState(false);
  const spring = useSpring({
    config: config.wobbly,
    width: enter ? '250px' : '200px'
  });

  const provider = new firebase.auth.GithubAuthProvider();
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
      GitHub
    </animated.button>
  );
};

export const StyledGitHubAuthButton = styled(GitHubAuthButton)`
  position: relative;
  width: 200px;
  height: auto;

  ${commonButtonStyle}
`;

export default StyledGitHubAuthButton;
