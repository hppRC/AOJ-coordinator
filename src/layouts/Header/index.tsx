import { Link } from 'gatsby';
import React from 'react';

import styled from '@emotion/styled';

import { StyledLogInOutButton } from './login-out-button';
import { StyledLogInOutModal } from './login-out-modal';

const Header: React.FCX = ({ className }) => {
  return (
    <header className={className}>
      <Link to='/'>
        <h1>AOJ Coordinator β</h1>
      </Link>
      <StyledLogInOutModal />
      <nav>
        <StyledLogInOutButton />
      </nav>
    </header>
  );
};

export const StyledHeader = styled(Header)`
  word-break: keep-all;
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

  a {
    color: #fff;
    text-decoration: none;
  }

  @media screen and (max-width: 768px) {
    padding: 1.5rem 1rem;
  }

  @media screen and (max-width: 480px) {
    a {
      h1 {
        font-size: 2rem;
      }
    }
  }
`;

export default StyledHeader;
