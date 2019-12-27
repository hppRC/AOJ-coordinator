import React, { ReactNode } from 'react';

import { FirebaseAuthContainer, SwitchContainer } from '../store';

export const WrapRootElement = ({ element }: { element: ReactNode }) => (
  <FirebaseAuthContainer.Provider>
    <SwitchContainer.Provider>{element}</SwitchContainer.Provider>
  </FirebaseAuthContainer.Provider>
);

export default WrapRootElement;
