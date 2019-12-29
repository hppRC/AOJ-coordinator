import React from 'react';
import { animated, config, useSpring } from 'react-spring';
import { StyledGoogleAuthButton } from 'src/components/auth-buttons';
import { FirebaseAuthContainer, SwitchContainer } from 'src/store';

import styled from '@emotion/styled';

const LoginModal: React.FCX = ({ className }) => {
  const { open, toggle } = SwitchContainer.useContainer();
  const { user } = FirebaseAuthContainer.useContainer();

  const settings = useSpring({
    config: config.default,
    from: { opacity: 0, display: 'none' },
    to: {
      opacity: open ? 1 : 0,
      display: open ? 'block' : 'none'
    }
  });
  return (
    <div className={className}>
      {user ? user.name : 'no name'}
      <animated.div style={settings} onClick={toggle} />
      <animated.div style={settings}>
        <div>AOJ coordinator{'\n'}を使うにはまずログインをしてください</div>
        <StyledGoogleAuthButton />
      </animated.div>
    </div>
  );
};

export const StyledLoginModal = styled(LoginModal)`
  > div:nth-of-type(1) {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: #00000077;
  }
  > div:nth-of-type(2) {
    position: fixed;
    top: 20vh;
    left: 20vh;
    display: flex;
    width: 60vw;
    height: 60vh;
    border-radius: 10px;
    background-color: #fff;
  }
`;

export default StyledLoginModal;
