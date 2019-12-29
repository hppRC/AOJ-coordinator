import React from 'react';
import { SwitchContainer } from 'src/store';

import styled from '@emotion/styled';

const LoginModal: React.FCX = ({ className }) => {
  const { open, toggle } = SwitchContainer.useContainer();
  return <div className={className}>{open ? 'test' : 'close'}</div>;
};

export const StyledLoginModal = styled(LoginModal)``;

export default StyledLoginModal;
