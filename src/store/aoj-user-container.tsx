import { useState } from 'react';
import { AOJUser } from 'types/models';
import { createContainer } from 'unstated-next';

const useAOJUserContainer = () => {
  const [aoj_user, setAOJUser] = useState<AOJUser | null>();

  const setAOJUserId = (aojUserId: string) => {
    setAOJUser({ ...(aoj_user as AOJUser), id: aojUserId });
    console.log(aoj_user);
  };

  return { aoj_user, setAOJUserId };
};

export const AOJUserContainer = createContainer(useAOJUserContainer);

export default AOJUserContainer;
