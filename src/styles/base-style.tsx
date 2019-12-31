import { css } from '@emotion/core';

export const baseStyle = css`
  flex: 1;

  width: 100%;
  max-width: 1400px;

  margin: 0 auto;
  padding: 10vh 2vw 5rem 2vw;

  h1 {
    font-size: 4rem;
    padding-bottom: 3rem;
  }

  @media screen and (max-width: 768px) {
  }
  @media screen and (max-width: 480px) {
    padding-top: 8vh;
  }
  @media screen and (max-height: 430px) {
    padding-top: 10rem;
  }
`;

export default baseStyle;
