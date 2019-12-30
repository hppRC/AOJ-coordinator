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

    //名前が保存されてるものと違う場合のみsetする,同じなら早期return
    if (aojUser?.id === userNameRef.current.value) return;

    try {
      setAOJUserOnFirestore(userNameRef.current.value);
    } catch (error) {
      console.error(error);
    }

    userNameRef.current.value = '';
  };
  return (
    <div className={className}>
      <h2>{aojUser?.id}</h2>
      <form onSubmit={onSubmit}>
        <label htmlFor='userName'>user name</label>
        <input type='text' id='userName' ref={userNameRef} />
        <button type='submit'>get aoj user data</button>
      </form>
    </div>
  );
};

const LogoutContents: React.FCX = ({ className }) => {
  return (
    <div className={className}>
      <div></div>
      <StyledGoogleAuthButton />
    </div>
  );
};

const StyledLoginContents = styled(LoginContents)``;
const StyledLogoutContents = styled(LogoutContents)``;

export const StyledAOJContents = styled(AOJContents)``;

export default StyledAOJContents;
