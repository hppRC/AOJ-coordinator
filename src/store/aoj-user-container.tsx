import { useState } from 'react';
import { AOJUser } from 'types/models';
import { createContainer } from 'unstated-next';

const useAOJUserContainer = () => {
  const [aoj_user, setAOJUser] = useState<AOJUser | null>();

  const setAOJUserId = (aojUserId: string) => {
    if (aojUserId !== aoj_user?.id) {
      setAOJUser({ ...(aoj_user as AOJUser), id: aojUserId });
    }
    return;
  };

  return { aoj_user, setAOJUser, setAOJUserId };
};

export const AOJUserContainer = createContainer(useAOJUserContainer);

export default AOJUserContainer;
