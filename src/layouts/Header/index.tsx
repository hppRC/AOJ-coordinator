import React from 'react';

import styled from '@emotion/styled';

import { StyledLoginModal } from './login-modal';
import { StyledModeButton } from './login-out-button';

const Header: React.FCX = ({ className }) => {
  return (
    <header className={className}>
      <h1>AOJ Coordinator</h1>
      <nav>
        <StyledModeButton />
        <StyledLoginModal />
      </nav>
    </header>
  );
};

export const StyledHeader = styled(Header)`
  position: fixed;
  top: 0;
  left: 0;

  display: flex;
  justify-content: space-between;
  width: 100%;

  padding: 2rem;
  color: #fff;
  background-color: #000113;

  z-index: 1000;
`;

export default StyledHeader;
