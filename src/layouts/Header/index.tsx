import React from 'react';

import styled from '@emotion/styled';

import { StyledLoginModal } from './login-modal';
import { StyledLogInOutButton } from './login-out-button';

const Header: React.FCX = ({ className }) => {
  return (
    <header className={className}>
      <h1>AOJ Coordinator</h1>
      <nav>
        <StyledLogInOutButton />
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
  align-items: flex-end;
  width: 100%;

  padding: 2rem;
  color: #fff;
  background-color: #000113;

  z-index: 1000;

  @media screen and (max-width: 768px) {
    padding: 2rem 1rem;
  }

  @media screen and (max-width: 480px) {
    padding: 2rem 1rem;
  }
`;

export default StyledHeader;
