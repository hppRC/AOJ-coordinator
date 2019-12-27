import axios, { AxiosResponse } from 'axios';
import React, { useRef } from 'react';
import { AOJUserContainer } from 'src/store';
import { AOJUser } from 'types/models';

import styled from '@emotion/styled';

const AOJContents: React.FCX = ({ className }) => {
  const { setAOJUser } = AOJUserContainer.useContainer();

  const ref = useRef<HTMLInputElement>(null);

  const onSubmit = async (e: React.SyntheticEvent<{}>) => {
    e.preventDefault();
    if (!ref.current) return;

    try {
      const url = `https://judgeapi.u-aizu.ac.jp/users/${ref.current.value}`;
      const res: AxiosResponse<AOJUser> = await axios.get(url);
      setAOJUser(res.data);
      console.log(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className={className}>
      <form onSubmit={onSubmit}>
        <input type='text' ref={ref} />
        <button type='submit'>get aoj user data</button>
      </form>
    </div>
  );
};

export const StyledAOJContents = styled(AOJContents)`
  background-color: red;
`;

export default StyledAOJContents;
