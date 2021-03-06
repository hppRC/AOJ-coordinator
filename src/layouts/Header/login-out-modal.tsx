import firebase from 'firebase/app';
import React, { useEffect } from 'react';
import { animated, config, useSpring } from 'react-spring';
import { useDrag } from 'react-use-gesture';
import {
    StyledGitHubAuthButton, StyledGoogleAuthButton, StyledSignOutButton
} from 'src/components/auth-buttons';
import { FirebaseAuthContainer, SwitchContainer } from 'src/store';

import styled from '@emotion/styled';

const LogInOutModal: React.FCX = ({ className }) => {
  const { open, toggle, setOpen } = SwitchContainer.useContainer();
  const { user } = FirebaseAuthContainer.useContainer();

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
        {user ? <StyledLogOutModal /> : <StyledLogInModal />}
      </animated.div>
    </div>
  );
};

const LogOutModal: React.FCX = ({ className }) => {
  return (
    <section className={className}>
      <h3>本当にログアウトしてもよろしいですか？</h3>
      <StyledSignOutButton />
    </section>
  );
};

const StyledLogOutModal = styled(LogOutModal)`
  display: flex;
  height: 100%;
  flex-flow: column;
  justify-content: center;
  align-items: center;
  padding: 2rem;
  h3 {
    padding: 4rem;
  }
`;

const LogInModal: React.FCX = ({ className }) => {
  return (
    <section className={className}>
      <h3>AOJ coordinator{'\n'}を使うにはまずログインをしてください</h3>
      <StyledGoogleAuthButton />
      <StyledGitHubAuthButton />
    </section>
  );
};

const StyledLogInModal = styled(LogInModal)`
  display: flex;
  height: 100%;
  flex-flow: column;
  justify-content: center;
  align-items: center;
  padding: 2rem;
  h3 {
    padding: 4rem;
  }
  button {
    margin: 1rem 0;
  }

  @media screen and (max-width: 768px) {
  }
  @media screen and (max-width: 480px) {
    h3 {
      padding: 1rem 2rem;
    }
  }
`;

export const StyledLogInOutModal = styled(LogInOutModal)`
  display: flex;
  user-select: none;
  touch-action: auto;
  word-break: keep-all;
  z-index: 1001;

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
    top: 30vh;
    left: 30vw;
    display: flex;
    width: 40vw;
    height: 40vh;
    color: #000113;
    border-radius: 10px;
    background-color: #fff;

    will-change: transform;
  }

  @media screen and (max-width: 1100px) {
    > div:nth-of-type(2) {
      touch-action: none;
      top: 30vh;
      left: 20vw;
      width: 60vw;
      height: 40vh;
    }
  }

  @media screen and (max-width: 768px) {
    > div:nth-of-type(2) {
      touch-action: none;
      top: 30vh;
      left: 20vw;
      width: 60vw;
      height: 40vh;
    }
  }

  @media screen and (max-width: 480px) {
    > div:nth-of-type(2) {
      top: 30vh;
      left: 2vw;
      width: 96vw;
      height: 40vh;
    }
  }

  @media screen and (max-height: 430px) {
    > div:nth-of-type(2) {
      touch-action: none;
      top: 20vh;
      left: 20vw;
      width: 60vw;
      height: 60vh;
    }
  }
`;

export default StyledLogInOutModal;
