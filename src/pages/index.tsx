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
`;

export default () => (
  <>
    <SEO title='Top' pathname='/' />
    <StyledIndex />
  </>
);
