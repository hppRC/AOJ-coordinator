import React, { ReactNode } from 'react';

import { AOJContainer, FirebaseAuthContainer } from '../store';

export const WrapRootElement = ({ element }: { element: ReactNode }) => (
  <FirebaseAuthContainer.Provider>
    <AOJContainer.Provider>{element}</AOJContainer.Provider>
  </FirebaseAuthContainer.Provider>
);

export default WrapRootElement;
