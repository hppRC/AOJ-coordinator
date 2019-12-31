import { AxiosResponse } from 'axios';
import firebase from 'firebase/app';
import React from 'react';
import { SEO } from 'src/components';
import { AOJContainer } from 'src/store';
import { baseStyle } from 'src/styles';

import styled from '@emotion/styled';

const Presenter: React.FCX = ({ className }) => {
  const { client } = AOJContainer.useContainer();
  const onClick = async () => {
    const url = `https://judgeapi.u-aizu.ac.jp/problems?size=${10000}`;
    let res: AxiosResponse<any>;
    try {
      res = await client.get(url);
    } catch (error) {
      console.error(error);
      return;
    }

    const allProblems: object[] = [];
    const allProblemIds: string[] = [];
    for (const problem of res.data) {
      const { id } = problem;
      allProblems.push(problem);
      allProblemIds.push(id);
    }

    console.log(allProblems);
    console.log(allProblemIds);

    try {
      await firebase
        .firestore()
        .collection(`AOJdata`)
        .doc('allProblems')
        .set({ allProblems });
    } catch (error) {
      console.error(error);
    }
    try {
      await firebase
        .firestore()
        .collection(`AOJdata`)
        .doc('allProblemIds')
        .set({ allProblemIds });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <main className={className}>
      <button onClick={onClick}>generate problem</button>
    </main>
  );
};

const StyledPresenter = styled(Presenter)`
  ${baseStyle};
`;

export default () => (
  <>
    <SEO title='Top' pathname='/presenter' />
    <StyledPresenter />
  </>
);
