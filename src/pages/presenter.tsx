import firebase from 'firebase/app';
import { navigate } from 'gatsby';
import React, { useEffect, useState } from 'react';
import { SEO } from 'src/components';
import { AOJContainer, FirebaseAuthContainer } from 'src/store';
import { baseStyle } from 'src/styles';

import styled from '@emotion/styled';

const Presenter: React.FCX = ({ className }) => {
  const { user } = FirebaseAuthContainer.useContainer();
  const { solvedProblemIds } = AOJContainer.useContainer();
  const [diff, setDiff] = useState<string[]>([]);
  const [selected, setSelected] = useState<string[]>([]);
  const problemsNum = 6;

  useEffect(() => {
    if (!user) navigate('/');

    return () => {};
  }, []);

  const onSubmit = async (e: React.SyntheticEvent<{}>) => {
    e.preventDefault();
    //diffをまだ作ってないときに限る
    // typeof diff == objectになったんだけど?????なんで？
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

      const diff: string[] = Array.from(difference);
      setDiff(diff);

      const tmp: string[] = [];
      for (let i = 0; i < problemsNum; i++) {
        tmp.push(diff[Math.floor(Math.random() * diff.length)]);
      }
      setSelected(tmp);
    } else {
      const tmp: string[] = [];
      for (let i = 0; i < problemsNum; i++) {
        tmp.push(diff[Math.floor(Math.random() * diff.length)]);
      }
      setSelected(tmp);
    }
  };

  const copy = (id: string) => {
    const copyFrom = document.createElement('textarea');
    copyFrom.textContent = id;
    const bodyElm = document.getElementsByTagName('body')[0];

    bodyElm.appendChild(copyFrom);

    copyFrom.select();
    document.execCommand('copy');

    bodyElm.removeChild(copyFrom);
  };

  return (
    <main className={className}>
      <form onSubmit={onSubmit}>
        <button type='submit'>generate problem</button>
      </form>
      <ul>
        {selected.map((id: string, i: number) => (
          <li key={i}>
            <h2>{id}</h2>
            <p>{`http://judge.u-aizu.ac.jp/onlinejudge/description.jsp?id=${id}&lang=ja`}</p>
            <button onClick={() => copy(id)}>copy ID</button>
            <button
              onClick={() =>
                copy(
                  `http://judge.u-aizu.ac.jp/onlinejudge/description.jsp?id=${id}&lang=ja`
                )
              }
            >
              copy URL
            </button>
          </li>
        ))}
      </ul>
    </main>
  );
};

const StyledPresenter = styled(Presenter)`
  ${baseStyle};

  form {
    padding-bottom: 5rem;

    button {
      border-radius: 5px;
      padding: 2rem 1rem;
      color: #fff;
      background-color: #030027;

      transition: opacity, transform 0.3s;

      :hover {
        opacity: 0.9;
        transform: scale(1.2);
      }
    }
  }

  ul {
    list-style: none;

    li {
      display: flex;
      display: grid;
      grid-template-columns: 1fr 4fr 1fr 1fr;
      grid-gap: 4vw;
      justify-content: center;
      padding: 2rem 0;

      h2 {
        word-break: keep-all;
      }

      p {
      }

      > button {
        border-radius: 5px;
        padding: 0.5rem 1rem;
        color: #fff;
        background-color: #030027;

        transition: opacity, transform 0.3s;

        :hover {
          opacity: 0.9;
          transform: scale(1.2);
        }
      }
    }
  }

  @media screen and (max-width: 768px) {
  }
  @media screen and (max-width: 480px) {
    form {
      padding: 3rem 0 2rem 0;
      > button {
        height: 4rem;
        :hover {
          transform: scale(1.05);
        }
      }
    }

    ul {
      li {
        grid-template:
          'a a c d' 5rem
          'b b b b' 5rem / 0.8fr 1fr 1fr 1fr;
        grid-gap: 0;
        padding: 0;
        justify-content: center;
        align-items: center;
        grid-column-gap: 1vw;
        padding: 0.5rem 0;

        h2 {
          grid-area: a;
          font-size: 2.6rem;
        }
        p {
          grid-area: b;
        }
        > button {
          padding: 0;
          height: 2.5rem;
          :hover {
            opacity: 0.9;
            transform: scale(1.05);
          }
        }
        button:nth-of-type(1) {
          grid-area: c;
        }
        button:nth-of-type(2) {
          grid-area: d;
        }
      }
    }
  }
`;

export default () => (
  <>
    <SEO title='Top' pathname='/presenter' />
    <StyledPresenter />
  </>
);
