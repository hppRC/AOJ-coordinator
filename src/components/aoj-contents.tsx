import React, { useRef } from 'react';
import { AOJContainer, FirebaseAuthContainer } from 'src/store';

import styled from '@emotion/styled';

import { StyledGoogleAuthButton } from './auth-buttons';

const AOJContents: React.FCX = ({ className }) => {
  const { user } = FirebaseAuthContainer.useContainer();

  return (
    <section className={className}>
      {user ? <StyledLoginContents /> : <StyledLogoutContents />}
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

  return (
    <section className={className}>
      <h2>{aojUser?.id}</h2>
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
        <section>
          <h2>Problem Presenter</h2>
        </section>
        <section>
          <h2>Virtual Contest Coordinator</h2>
        </section>
        <section>
          <h2>comming soon!</h2>
        </section>
        <section>
          <h2>comming soon!</h2>
        </section>
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
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 2rem;
    padding: 5rem 0;

    > section {
      display: block;
      padding: 2rem;
      border-radius: 5px;
      box-shadow: 0 0 3px 3px #03002720;
      width: 30vh;
      height: 30vh;
      background-color: #fff;
      cursor: pointer;

      h2 {
        word-break: keep-all;
      }

      transition: transform 0.3s;

      :hover {
        transform: scale(1.2);
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

  @media screen and (max-width: 768px) {
    div {
      grid-template-columns: repeat(2, 1fr);
    }
  }
  @media screen and (max-width: 480px) {
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
