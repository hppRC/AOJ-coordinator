import { AxiosResponse } from 'axios';
import firebase from 'firebase/app';
import { navigate } from 'gatsby';
import React, { useEffect, useState } from 'react';
import { SEO } from 'src/components';
import { AOJContainer, FirebaseAuthContainer } from 'src/store';
import { baseStyle } from 'src/styles';

import styled from '@emotion/styled';

const Presenter: React.FCX = ({ className }) => {
  const { user } = FirebaseAuthContainer.useContainer();
  const { aojUser, solvedProblemIds } = AOJContainer.useContainer();
  const [diff, setDiff] = useState<string[]>([]);
  const [selected, setSelected] = useState<string[]>([]);

  useEffect(() => {
    if (!user) navigate('/');

    return () => {};
  }, []);

  const onClick = async () => {
    //diffをまだ作ってないときに限る
    // console.log(typeof diff); == object?????なんで？
    if (diff.length === 0) {
      const data: any = (
        await firebase
          .firestore()
          .collection('AOJdata')
          .doc('allProblemIds')
          .get()
      ).data();

      const difference: Set<string> = new Set(
        data.allProblemIds.filter((e: string) => !solvedProblemIds.has(e))
      );

      console.log(difference);

      const diff: string[] = Array.from(difference);
      setDiff(diff);

      const tmp: string[] = [];
      for (let i = 0; i < 6; i++) {
        tmp.push(diff[Math.floor(Math.random() * diff.length)]);
      }
      console.log(tmp);
      setSelected(tmp);
    } else {
      console.log('test');
      const tmp: string[] = [];
      for (let i = 0; i < 6; i++) {
        tmp.push(diff[Math.floor(Math.random() * diff.length)]);
      }
      console.log(tmp);
      setSelected(tmp);
    }
  };

  return (
    <main className={className}>
      <button onClick={onClick}>generate problem</button>
      <ul>
        {console.log(selected)}
        {selected.map((id: string, i: number) => (
          <li key={i}>
            <h3>{id}</h3>
            <p>{`http://judge.u-aizu.ac.jp/onlinejudge/description.jsp?id=${id}`}</p>
          </li>
        ))}
      </ul>
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
