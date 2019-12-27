import 'firebase/auth';

import firebase from 'firebase/app';
import * as React from 'react';

import styled from '@emotion/styled';

const SignOutButton: React.FCX = ({ className }) => {
  const onClick = () => {
    firebase.auth().signOut();
  };

  return (
    <button className={className} onClick={onClick}>
      Sign out from gatsby-firebase-skeleton
    </button>
  );
};

export const StyledSignOutButton = styled(SignOutButton)`
  border: solid 1px #000;
`;

export default StyledSignOutButton;
