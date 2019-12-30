import firebase from 'firebase/app';
import React, { useEffect } from 'react';
import { animated, config, useSpring } from 'react-spring';
import { useDrag } from 'react-use-gesture';
import { StyledGoogleAuthButton } from 'src/components/auth-buttons';
import { SwitchContainer } from 'src/store';

import styled from '@emotion/styled';

const LoginModal: React.FCX = ({ className }) => {
  const { open, toggle, setOpen } = SwitchContainer.useContainer();

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged(user => {
      //userがログインしたらモーダルを開いている必要がないので閉じる
      if (user) setOpen(false);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const [{ x, y }, set] = useSpring(() => ({ x: 0, y: 0 }));
  const bind = useDrag(({ down, movement: [mx, my] }) => {
    set({ x: down ? mx : 0, y: down ? my : 0 });
  });

  const commonSettings = useSpring({
    config: config.gentle,
    opacity: open ? 1 : 0,
    display: open ? 'block' : 'none'
  });

  const modalSettings = useSpring({
    config: config.gentle,
    transform: open ? 'translate3d(0, 0, 0)' : 'translate3d(0, 15px, 0)'
  });

  return (
    <div className={className}>
      <animated.div style={commonSettings} onClick={toggle} />
      <animated.div
        {...bind()}
        style={{ ...commonSettings, ...modalSettings, x, y }}
      >
        <div>AOJ coordinator{'\n'}を使うにはまずログインをしてください</div>
        <StyledGoogleAuthButton />
      </animated.div>
    </div>
  );
};

export const StyledLoginModal = styled(LoginModal)`
  display: flex;
  > div:nth-of-type(1) {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: #00011390;
  }
  > div:nth-of-type(2) {
    position: fixed;
    top: 20vh;
    left: 20vw;
    display: flex;
    width: 60vw;
    height: 60vh;
    color: #000113;
    border-radius: 10px;
    background-color: #fff;

    will-change: transform;
  }

  @media screen and (max-width: 768px) {
    > div:nth-of-type(2) {
      top: 20vh;
      left: 10vw;
      width: 80vw;
      height: 60vh;
    }
  }

  @media screen and (max-width: 480px) {
    > div:nth-of-type(2) {
      top: 20vh;
      left: 2vw;
      width: 96vw;
      height: 60vh;
    }
  }
`;

export default StyledLoginModal;
