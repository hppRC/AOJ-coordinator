import React from 'react';

import styled from '@emotion/styled';

import { StyledLogInOutButton } from './login-out-button';
import { StyledLogInOutModal } from './login-out-modal';

const Header: React.FCX = ({ className }) => {
  return (
    <header className={className}>
      <h1>AOJ Coordinator β</h1>
      <StyledLogInOutModal />
      <nav>
        <StyledLogInOutButton />
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
  background-color: #030027;

  z-index: 1000;

  @media screen and (max-width: 768px) {
    padding: 1.5rem 1rem;
  }

  @media screen and (max-width: 480px) {
    h1 {
      font-size: 2rem;
    }
    padding: 1rem 0.75rem;
  }
`;

export default StyledHeader;
