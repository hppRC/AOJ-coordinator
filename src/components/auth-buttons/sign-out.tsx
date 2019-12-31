import 'firebase/auth';

import firebase from 'firebase/app';
import { navigate } from 'gatsby';
import React, { useState } from 'react';
import { animated, config, useSpring } from 'react-spring';
import { SwitchContainer } from 'src/store';

import styled from '@emotion/styled';

const SignOutButton: React.FCX = ({ className }) => {
  const { setOpen } = SwitchContainer.useContainer();
  const [enter, setEnter] = useState(false);
  const spring = useSpring({
    config: config.wobbly,
    fontSize: enter ? '4rem' : '1.4rem',
    backgroundColor: enter ? '#030027' : '#fff',
    color: enter ? '#fff' : '#030027'
  });

  const onClick = async () => {
    try {
      await firebase.auth().signOut();
    } catch (error) {
      console.error(error);
    }
    setOpen(false);
    navigate('/', { replace: true });
  };

  return (
    <animated.button
      style={spring}
      className={className}
      onClick={onClick}
      onMouseEnter={_ => setEnter(true)}
      onMouseLeave={_ => setEnter(false)}
    >
      Log out
    </animated.button>
  );
};

export const StyledSignOutButton = styled(SignOutButton)`
  border: solid 1px #000;
  border-radius: 5px;
  padding: 2rem 3rem;
  will-change: font-size, color, background-color;
`;

export default StyledSignOutButton;
