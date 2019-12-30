import React from 'react';
import { SEO, StyledAOJContents, StyledGoogleAuthButton } from 'src/components';
import BackgroundSVG from 'src/images/background.svg';
import EyecatchSVG from 'src/images/undraw_our_solution_htvp.svg';
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
        <img src={EyecatchSVG} />
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
      <div>
        <img src={BackgroundSVG} />
      </div>
    </main>
  );
};

const StyledIndex = styled(Index)`
  ${baseStyle};
  margin-top: 10vh;

  > section {
    display: flex;

    img {
      width: 10vw;
    }
  }

  > div:nth-child(3) {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100vw;
    z-index: -1;
  }
`;

export default () => (
  <>
    <SEO title='Top' pathname='/' />
    <StyledIndex />
  </>
);
