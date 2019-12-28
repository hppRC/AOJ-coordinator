import React, { ReactNode } from 'react';

import { AOJContainer, FirebaseAuthContainer, SwitchContainer } from '../store';

export const WrapRootElement = ({ element }: { element: ReactNode }) => (
  <FirebaseAuthContainer.Provider>
    <AOJContainer.Provider>
      <SwitchContainer.Provider>{element}</SwitchContainer.Provider>
    </AOJContainer.Provider>
  </FirebaseAuthContainer.Provider>
);

export default WrapRootElement;
