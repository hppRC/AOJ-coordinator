import React from 'react';
import BackgroundSVG from 'src/images/background.svg';

import styled from '@emotion/styled';

const Footer: React.FCX = ({ className }) => (
  <footer className={className}>
    <p>
      Copyright © 2019 <a href='https://twitter.com/osaremochi'>hppRC</a>.
    </p>
  </footer>
);

export const StyledFooter = styled(Footer)`
  display: flex;
  justify-content: center;
  align-items: flex-end;

  width: 100vw;
  height: 20vw;

  background: center / 105% no-repeat url(${BackgroundSVG});
  background-color: #fff;

  p {
    color: #fff;
    padding: 2rem;

    a {
      color: #fff;
      text-decoration: none;
    }
  }

  @media screen and (max-width: 768px) {
    p {
      font-size: 1.2rem;
      padding: 1rem;
    }
  }

  @media screen and (max-width: 480px) {
    background: center / 110% no-repeat url(${BackgroundSVG});
    p {
      font-size: 1rem;
      padding: 0.5rem;
    }
  }
`;

export default StyledFooter;
