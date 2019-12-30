import React from 'react';
import { SEO, StyledAOJContents } from 'src/components';
import { SwitchContainer } from 'src/store';
import baseStyle from 'src/styles/base-style';

import styled from '@emotion/styled';

const Index: React.FCX = ({ className }) => {
  //モーダルが開いている間はタッチイベントを無効にする
  const { open } = SwitchContainer.useContainer();
  return (
    <main className={className} style={{ touchAction: open ? 'none' : 'auto' }}>
      <section>
        <h1>AOJ Coordinator</h1>
        <h2>
          AOJ CoordinatorはAOJ関連の色々をいい感じになんやかんやするサービスです
        </h2>
      </section>
      <StyledAOJContents />
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
