import { useState } from 'react';
import { AOJUser } from 'types/models';
import { createContainer } from 'unstated-next';

const useAOJUserContainer = () => {
  const [aoj_user, setAOJUser] = useState<AOJUser | null>();

  return { aoj_user, setAOJUser };
};

export const AOJUserContainer = createContainer(useAOJUserContainer);

export default AOJUserContainer;
