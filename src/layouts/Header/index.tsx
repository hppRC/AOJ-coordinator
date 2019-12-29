import React from 'react';
import { StyledLoginModal } from 'src/components';

import styled from '@emotion/styled';

import { StyledModeButton } from './mode-button';

const Header: React.FCX = ({ className }) => {
  return (
    <header className={className}>
      <h1>AOJ Cordinator</h1>
      <nav>
        <StyledModeButton />
        <StyledLoginModal />
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

  z-index: 1000;
`;

export default StyledHeader;
