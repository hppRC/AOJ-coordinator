import React from 'react';
import BackgroundSVG from 'src/images/background.svg';

import styled from '@emotion/styled';

const Background: React.FCX = ({ className }) => {
  return (
    <div className={className}>
      <img src={BackgroundSVG} />
    </div>
  );
};

export const StyledBackground = styled(Background)`
  position: fixed;
  bottom: 3vh;
  left: 0;
  width: 100vw;
  z-index: -1;
  transform: scale(1.1);

  @media screen and (max-width: 768px) {
    bottom: 5vh;
  }

  @media screen and (max-width: 480px) {
    bottom: 10vh;
  }
`;

export default StyledBackground;
