import React from 'react';
import { SEO, StyledAOJContents, StyledGoogleAuthButton } from 'src/components';
import { FirebaseAuthContainer } from 'src/store';
import baseStyle from 'src/styles/base-style';

import styled from '@emotion/styled';

const Index: React.FCX = ({ className }) => {
  const { user } = FirebaseAuthContainer.useContainer();

  return (
    <main className={className}>
      <section>
        <h1>AOJ Coordinator</h1>
        <h2>
          AOJ CoordinatorはAOJ関連の色々をいい感じになんやかんやするサービスです
        </h2>
      </section>
      {user ? (
        <>
          <StyledAOJContents />
        </>
      ) : (
        <div>
          <h2>利用するにはログインしてください</h2>
          <StyledGoogleAuthButton />
        </div>
      )}
    </main>
  );
};

const StyledIndex = styled(Index)`
  ${baseStyle};
  padding-top: 10vh;
`;

export default () => (
  <>
    <SEO title='Top' pathname='/' />
    <StyledIndex />
  </>
);
