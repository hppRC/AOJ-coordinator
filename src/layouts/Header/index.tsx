import React from 'react';
import { StyledGoogleAuthButton } from 'src/components';

import styled from '@emotion/styled';

const Header: React.FCX = ({ className }) => {
  return (
    <header className={className}>
      <h1>AOJ Cordinator</h1>
      <nav>
        <ul>
          <li>
            <StyledGoogleAuthButton />
          </li>
        </ul>
      </nav>
    </header>
  );
};

export const StyledHeader = styled(Header)`
  top: 0;
  position: fixed;
  left: 0;

  display: flex;
  justify-content: space-between;
  width: 100%;

  > nav {
    > ul {
      list-style: none;
    }
  }

  z-index: 1000;
`;

export default StyledHeader;
