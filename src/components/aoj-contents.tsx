import axios, { AxiosResponse } from 'axios';
import React, { useRef } from 'react';
import { AOJUserContainer, FirebaseAuthContainer } from 'src/store';
import { AOJUser } from 'types/models';

import styled from '@emotion/styled';

const AOJContents: React.FCX = ({ className }) => {
  const client = axios.create({
    xsrfHeaderName: 'X-CSRF-Token',

    withCredentials: true
  });
  const { user } = FirebaseAuthContainer.useContainer();
  const { aojUser, setAOJUserOnFirestore } = AOJUserContainer.useContainer();

  const userNameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const onSubmit = async (e: React.SyntheticEvent<{}>) => {
    e.preventDefault();
    if (
      !user ||
      !userNameRef.current?.value.trim() ||
      !passwordRef.current?.value.trim()
    )
      return;

    //名前が保存されてるものと違う場合のみsetする,同じなら早期return
    //if (aojUser?.id === userNameRef.current.value) return;

    try {
      const url = `https://judgeapi.u-aizu.ac.jp/session`;
      const res: AxiosResponse<AOJUser> = await client.post(url, {
        id: userNameRef.current.value,
        password: passwordRef.current.value
      });
      console.log(res);
      setAOJUserOnFirestore(user.uid, res.data);
    } catch (error) {
      console.error(error);
    }

    userNameRef.current.value = '';

    passwordRef.current.value = '';
  };

  const handleSession = async () => {
    try {
      const url = `https://judgeapi.u-aizu.ac.jp/self`;
      const res: AxiosResponse<AOJUser> = await client.get(url);
      console.log(res);
    } catch (error) {
      console.error(error);
    }
  };

  const handleLogout = async () => {
    try {
      const url = `https://judgeapi.u-aizu.ac.jp/session`;
      const res: AxiosResponse<AOJUser> = await client.delete(url);
      console.log(res);
    } catch (error) {
      console.error(error);
    }
  };

  const handleArena = async () => {
    try {
      const url = `https://judgeapi.u-aizu.ac.jp/arenas`;
      const res: AxiosResponse<AOJUser> = await client.post(url);
      console.log(res);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className={className}>
      <h1>{aojUser?.id}</h1>
      <form onSubmit={onSubmit}>
        <label htmlFor='userName'>user name</label>
        <input type='text' id='userName' ref={userNameRef} />
        <label htmlFor='password'>password</label>
        <input type='password' id='password' ref={passwordRef} />
        <br />
        <button type='submit'>get aoj user data</button>
      </form>
      <button onClick={handleSession}>session</button>
      <button onClick={handleLogout}>logout</button>
      <button onClick={handleArena}>arena</button>
    </div>
  );
};

export const StyledAOJContents = styled(AOJContents)`
  background-color: red;
`;

export default StyledAOJContents;
