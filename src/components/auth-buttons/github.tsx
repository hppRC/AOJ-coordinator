import 'firebase/auth';

import firebase from 'firebase/app';
import React, { useState } from 'react';
import { DiGithubBadge } from 'react-icons/di';
import { animated, config, useSpring } from 'react-spring';

import styled from '@emotion/styled';

const GitHubAuthButton: React.FCX = ({ className }) => {
  const [enter, setEnter] = useState(false);
  const spring = useSpring({
    config: config.wobbly,
    transform: enter ? 'scale(1.2)' : 'scale(1)',
    backgroundColor: enter ? '#030027' : '#fff',
    color: enter ? '#fff' : '#030027'
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
      <DiGithubBadge />
      <h3>Sign in with GitHub</h3>
    </animated.button>
  );
};

export const StyledGitHubAuthButton = styled(GitHubAuthButton)`
  position: relative;

  display: flex;
  height: auto;
  white-space: nowrap;

  padding: 0 0 0 2rem;

  border-radius: 5px;

  svg {
    position: absolute;
    top: 1rem;
    left: 2rem;
    display: inline-block;
    width: 5rem;
    height: 5rem;
  }

  h3 {
    display: inline-block;
    text-indent: 1rem;
    font-size: 1.5rem;
    padding: 2.5rem 3rem 2.5rem 4rem;
  }
`;

export default StyledGitHubAuthButton;
