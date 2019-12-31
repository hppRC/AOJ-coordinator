import React from 'react';
import { SEO, StyledAOJContents } from 'src/components';
import baseStyle from 'src/styles/base-style';

import styled from '@emotion/styled';

const Index: React.FCX = ({ className }) => {
  return (
    <main className={className}>
      <section>
        <h1>AOJ Coordinator β ver.</h1>
      </section>
      <StyledAOJContents />
    </main>
  );
};

const StyledIndex = styled(Index)`
  ${baseStyle};

  @media screen and (max-width: 768px) {
  }
  @media screen and (max-width: 480px) {
    h1 {
      font-size: 4rem;
      word-break: keep-all;
    }
  }
`;

export default () => (
  <>
    <SEO title='Top' pathname='/' />
    <StyledIndex />
  </>
);
