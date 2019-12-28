import { AxiosResponse } from 'axios';
import React, { useRef } from 'react';
import { AOJContainer, FirebaseAuthContainer } from 'src/store';
import { AOJUser } from 'types/models';

import styled from '@emotion/styled';

const AOJContents: React.FCX = ({ className }) => {
  const { user } = FirebaseAuthContainer.useContainer();
  const {
    aojUser,
    setAOJUserOnFirestore,
    client,

    solvedProblemIds
  } = AOJContainer.useContainer();

  const userNameRef = useRef<HTMLInputElement>(null);

  const onSubmit = async (e: React.SyntheticEvent<{}>) => {
    e.preventDefault();
    if (!user || !userNameRef.current?.value.trim()) return;

    //名前が保存されてるものと違う場合のみsetする,同じなら早期return
    //if (aojUser?.id === userNameRef.current.value) return;

    try {
      const url = `https://judgeapi.u-aizu.ac.jp/users/${userNameRef.current.value}`;
      const res: AxiosResponse<AOJUser> = await client.get(url);
      console.log(res.data);
      setAOJUserOnFirestore(res.data);
    } catch (error) {
      console.error(error);
    }

    userNameRef.current.value = '';
  };

  const handleProblems = async () => {
    // const test = (
    //   await firebase
    //     .firestore()
    //     .collection(`users`)
    //     .doc(user?.uid)
    //     .collection(`solved_problems`)
    //     .get()
    // ).docs.map(doc => doc.data());
    // console.log(test);
    //
    console.log(solvedProblemIds);
  };

  return (
    <div className={className}>
      <h1>{aojUser?.id}</h1>
      <form onSubmit={onSubmit}>
        <label htmlFor='userName'>user name</label>
        <input type='text' id='userName' ref={userNameRef} />
        <button type='submit'>get aoj user data</button>
      </form>
      <button onClick={handleProblems}>problems</button>
    </div>
  );
};

export const StyledAOJContents = styled(AOJContents)`
  background-color: red;
`;

export default StyledAOJContents;
