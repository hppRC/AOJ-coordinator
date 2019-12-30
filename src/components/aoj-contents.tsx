import React, { useRef } from 'react';
import { animated, config, useSprings } from 'react-spring';
import { AOJContainer, FirebaseAuthContainer } from 'src/store';

import styled from '@emotion/styled';

import { StyledGoogleAuthButton } from './auth-buttons';

const AOJContents: React.FCX = ({ className }) => {
  const { user } = FirebaseAuthContainer.useContainer();

  return (
    <section className={className}>
      {user ? (
        <StyledLoginContents />
      ) : (
        <>
          <h2>
            AOJ
            CoordinatorはAOJ関連の色々をいい感じになんやかんやするサービスです
          </h2>
          <StyledLogoutContents />
        </>
      )}
    </section>
  );
};

const LoginContents: React.FCX = ({ className }) => {
  const { user } = FirebaseAuthContainer.useContainer();
  const { aojUser, setAOJUserOnFirestore } = AOJContainer.useContainer();

  const userNameRef = useRef<HTMLInputElement>(null);

  const onSubmit = async (e: React.SyntheticEvent<{}>) => {
    e.preventDefault();
    if (!user || !userNameRef.current?.value.trim()) return;
    //名前が保存されてるものと違う場合のみsetする,同じなら書き込み直す必要が無いので早期return
    if (aojUser?.id === userNameRef.current.value) return;

    userNameRef.current.value = '';

    try {
      await setAOJUserOnFirestore(userNameRef.current.value);
    } catch (error) {
      console.error(error);
    }
  };

  const contents = [
    <>
      <h2>Problem Presenter</h2>
    </>,
    <>
      <h2>Virtual Contest Coordinator</h2>
    </>,
    <>
      <h2>comming soon!</h2>
    </>,
    <>
      <h2>comming soon!</h2>
    </>
  ];

  const [springs, set] = useSprings(contents.length, idx => ({
    // idxによって異なる設定をしてもよい。
    config: config.wobbly,
    transform: 'scale(1)',
    zIndex: 0
  }));

  return (
    <section className={className}>
      <h2>{aojUser?.id ?? 'Who are you?'}</h2>
      <form onSubmit={onSubmit}>
        <label htmlFor='userName'>user name</label>
        <input
          type='text'
          id='userName'
          ref={userNameRef}
          placeholder='AOJ User Id'
        />
        <button type='submit'>get aoj user data</button>
      </form>
      <div>
        {springs.map((item, idx) => (
          <animated.section
            key={idx}
            onMouseEnter={e =>
              set(i =>
                i === idx ? { transform: 'scale(1.2)' } : { zIndex: 0 }
              )
            }
            onMouseLeave={e =>
              set(i => (i === idx ? { transform: 'scale(1)' } : {}))
            }
            style={{ ...item, willChange: 'transform' }}
          >
            {contents[idx]}
          </animated.section>
        ))}
      </div>
    </section>
  );
};

const LogoutContents: React.FCX = ({ className }) => {
  return (
    <div className={className}>
      <StyledGoogleAuthButton />
    </div>
  );
};

const StyledLoginContents = styled(LoginContents)`
  display: flex;
  flex-flow: column;
  padding: 5rem 0;

  div {
    width: 100%;
    display: grid;
    grid-template-columns: repeat(auto-fit, 30vh);
    grid-row-gap: 6vh;
    justify-content: space-around;
    padding: 5rem 0;

    > section {
      display: flex;
      z-index: 0;
      padding: 2rem;
      border-radius: 5px;
      box-shadow: 0 0 3px 3px #03002720;
      width: 30vh;
      height: 30vh;
      background-color: #fff;
      cursor: pointer;

      justify-content: center;
      align-items: center;
      h2 {
        word-break: keep-all;
      }
    }

    > section:nth-of-type(1) {
    }
    > section:nth-of-type(2) {
    }
    > section:nth-of-type(3) {
    }
    > section:nth-of-type(4) {
    }
  }
  @media screen and (max-width: 1100px) {
  }

  @media screen and (max-width: 768px) {
  }
  @media screen and (max-width: 480px) {
    div {
      grid-template-columns: repeat(1, 1fr);

      > section {
        width: 100%;
      }
    }
  }

  @media screen and (max-height: 430px) {
    div {
      grid-template-columns: repeat(1, 1fr);

      > section {
        width: 100%;
      }
    }
  }
`;

const StyledLogoutContents = styled(LogoutContents)``;

export const StyledAOJContents = styled(AOJContents)``;

export default StyledAOJContents;
