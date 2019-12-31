import { css } from '@emotion/core';

export const commonButtonStyle = css`
  ::before {
    content: '';
    display: block;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: #000113;
    border-radius: 5px;
    opacity: 0;
    transition: opacity 0.2s ease;
  }

  :hover::before {
    opacity: 0.3;
  }

  @media screen and (max-width: 768px) {
  }
  @media screen and (max-width: 480px) {
  }
  @media screen and (max-height: 430px) {
  }
`;

export default commonButtonStyle;
