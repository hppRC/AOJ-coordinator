import React from 'react';
import {
    SEO, StyledGoogleAuthButton as GoogleAuthButton, StyledSignOutButton as SignOutButton
} from 'src/components';
import { StyledTodoContents as TodoContents } from 'src/internal/index/todo-contents';
import { FirebaseAuthContainer } from 'src/store';
import baseStyle from 'src/styles/base-style';

import styled from '@emotion/styled';

const Index: React.FCX = ({ className }) => {
  const { user } = FirebaseAuthContainer.useContainer();
  return (
    <main className={className}>
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
