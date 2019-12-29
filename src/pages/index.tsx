import React from 'react';
import { SEO, StyledAOJContents } from 'src/components';
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
          <StyledAOJContents />
        </>
      ) : (
        <></>
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
