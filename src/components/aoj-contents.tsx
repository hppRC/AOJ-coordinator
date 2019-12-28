import axios, { AxiosResponse } from 'axios';
import React, { useRef } from 'react';
import { AOJUserContainer, FirebaseAuthContainer } from 'src/store';
import { AOJUser } from 'types/models';

import styled from '@emotion/styled';

const AOJContents: React.FCX = ({ className }) => {
  const { user } = FirebaseAuthContainer.useContainer();
  const { aojUser, setAOJUserOnFirestore } = AOJUserContainer.useContainer();

  const ref = useRef<HTMLInputElement>(null);

  const onSubmit = async (e: React.SyntheticEvent<{}>) => {
    e.preventDefault();
    if (!user || !ref.current?.value.trim()) return;

    if (aojUser?.id === ref.current.value) {
      console.log('same as current name');
      ref.current.value = '';
      return;
    }

    try {
      const url = `https://judgeapi.u-aizu.ac.jp/users/${ref.current.value}`;
      const res: AxiosResponse<AOJUser> = await axios.get(url);
      setAOJUserOnFirestore(user.uid, res.data);
    } catch (error) {
      console.error(error);
    }

    ref.current.value = '';
  };

  const handleLogin = () => {
    console.log(aojUser);
    console.log('AOJ login');
  };

  return (
    <div className={className}>
      <form onSubmit={onSubmit}>
        <input type='text' ref={ref} />
        <button type='submit'>get aoj user data</button>
      </form>
      <button onClick={handleLogin}>AOJ log in</button>
    </div>
  );
};

export const StyledAOJContents = styled(AOJContents)`
  background-color: red;
`;

export default StyledAOJContents;
