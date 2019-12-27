import axios, { AxiosResponse } from 'axios';
import { AOJUser } from 'models';
import React from 'react';
import {
    SEO, StyledGoogleAuthButton as GoogleAuthButton, StyledSignOutButton as SignOutButton
} from 'src/components';
import { StyledTodoContents as TodoContents } from 'src/internal/index/todo-contents';
import { AOJUserContainer, FirebaseAuthContainer } from 'src/store';
import baseStyle from 'src/styles/base-style';

import styled from '@emotion/styled';

const Index: React.FCX = ({ className }) => {
  const { user } = FirebaseAuthContainer.useContainer();
  const {
    aoj_user,
    setAOJUserId,
    setAOJUser
  } = AOJUserContainer.useContainer();

  const onClick = (e: React.SyntheticEvent<{}>) => {
    e.preventDefault();
    setAOJUserId('hppRC');
  };

  const handleAccess = async (e: React.SyntheticEvent<{}>) => {
    e.preventDefault();
    if (!aoj_user) return;
    try {
      const res: AxiosResponse<AOJUser> = await axios.get(
        `https://judgeapi.u-aizu.ac.jp/users/${aoj_user.id}`
      );

      setAOJUser(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <main className={className}>
      <button onClick={onClick}>add aoj user</button>
      <button onClick={handleAccess}>test access</button>
      {console.log(aoj_user)}
      <h1>this is index page!</h1>
      {user ? (
        <>
          <TodoContents />
          <SignOutButton />
        </>
      ) : (
        <GoogleAuthButton />
      )}
    </main>
  );
};

const StyledIndex = styled(Index)`
  ${baseStyle};
  padding-top: 20vh;
`;

export default () => (
  <>
    <SEO title='Top' pathname='/' />
    <StyledIndex />
  </>
);
