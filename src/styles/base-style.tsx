import { css } from '@emotion/core';

export const baseStyle = css`
  flex: 1;

  width: 100%;
  max-width: 1400px;

  margin: 0 auto;
  padding: 5rem 5vw 5rem 5vw;

  h1 {
    font-size: 4rem;
    padding-bottom: 3rem;
  }

  @media screen and (max-width: 768px) {
  }
  @media screen and (max-width: 480px) {
  }
`;

export default baseStyle;
