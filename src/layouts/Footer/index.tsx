import React from 'react';
import BackgroundSVG from 'src/images/background.svg';

import styled from '@emotion/styled';

const Footer: React.FCX = ({ className }) => (
  <footer className={className}>
    Copyright © 2019 hppRC All Rights Reserved.
  </footer>
);

export const StyledFooter = styled(Footer)`
  display: flex;
  justify-content: center;
  align-items: center;
  color: #151e3f;
  width: 100vw;
  height: 15vh;
  /* background-color: #151e3f; */
  background: center / 103% no-repeat url(${BackgroundSVG});
`;

export default StyledFooter;
