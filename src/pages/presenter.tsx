import React from 'react';
import { SEO } from 'src/components';
import baseStyle from 'src/styles/base-style';

import styled from '@emotion/styled';

const Presenter: React.FCX = ({ className }) => {
  return <main className={className}>presenter</main>;
};

const StyledPresenter = styled(Presenter)`
  ${baseStyle};
`;

export default () => (
  <>
    <SEO title='Top' pathname='/presenter' />
    <StyledPresenter />
  </>
);
