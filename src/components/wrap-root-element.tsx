import React, { ReactNode } from 'react';

import { AOJUserContainer, FirebaseAuthContainer, SwitchContainer } from '../store';

export const WrapRootElement = ({ element }: { element: ReactNode }) => (
  <FirebaseAuthContainer.Provider>
    <AOJUserContainer.Provider>
      <SwitchContainer.Provider>{element}</SwitchContainer.Provider>
    </AOJUserContainer.Provider>
  </FirebaseAuthContainer.Provider>
);

export default WrapRootElement;
