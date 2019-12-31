import axios, { AxiosResponse } from 'axios';
import firebase from 'firebase/app';
import { useEffect, useState } from 'react';
import { FirebaseAuthContainer } from 'src/store';
import { AOJUser, Problem } from 'types/models';
import { createContainer } from 'unstated-next';

const AOJDataCollRef = (uid: string) =>
  firebase
    .firestore()
    .collection(`users`)
    .doc(uid)
    .collection(`AOJData`);

const useAOJContainer = () => {
  //custom hook内でuseStateから取れた変数を使ってもリアクティブになっていないので注意
  const { user } = FirebaseAuthContainer.useContainer();
  const [aojUser, setAOJUser] = useState<AOJUser | null>();
  //useState内でSetを扱うのはおぬジェクトの参照の関係でめんどくさい、配列でラップするといい
  //https://dev.to/ganes1410/using-javascript-sets-with-react-usestate-39eo
  const [[solvedProblemIds], setProblemIds] = useState<Set<string>[]>([
    new Set()
  ]);

  const client = axios.create({
    xsrfHeaderName: 'X-CSRF-Token',
    withCredentials: true
  });

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged(async user => {
      if (user) {
        const docRef = AOJDataCollRef(user.uid).doc('userData');
        const userData = (await docRef.get()).data();
        setAOJUser(userData?.data);
      } else {
        setAOJUser(null);
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const setAOJUserOnFirestore = async (aojUserId: string) => {
    if (!user || aojUser?.id === aojUserId) return;

    const url = `https://judgeapi.u-aizu.ac.jp/users/${aojUserId}`;
    let res: AxiosResponse<AOJUser>;
    try {
      res = await client.get(url);
    } catch (error) {
      console.error(error);
      return;
    }
    if (res.status !== 200) return;

    const userData = res.data;
    setAOJUser(userData);
    initProblemsOnFirestore(userData.id);

    const docRef = AOJDataCollRef(user.uid).doc('userData');
    const doc = await docRef.get();

    if (doc.exists) {
      docRef
        .update({
          data: userData,
          updatedAt: firebase.firestore.FieldValue.serverTimestamp()
        })
        .catch(error => {
          console.error('update: document exists', error);
        });
    } else {
      docRef
        .set({
          data: userData,
          createdAt: firebase.firestore.FieldValue.serverTimestamp(),
          updatedAt: firebase.firestore.FieldValue.serverTimestamp()
        })
        .catch(error => {
          console.error("update: document dosen't exists", error);
        });
    }

    return;
  };

  const initProblemsOnFirestore = async (aojUserId: string) => {
    if (!user) return;
    const docRef = AOJDataCollRef(user.uid).doc(`solvedProblems`);

    try {
      const newSolvedProblemIds = new Set<string>();
      //AOJのAPIから指定ユーザの解答情報を全部取ってくる, 流石に5000回提出しとる人はおらんやろ👴
      const urlOfUserSolutions = `https://judgeapi.u-aizu.ac.jp/solutions/users/${aojUserId}?size=5000`;
      const res: AxiosResponse<Problem[]> = await client.get(
        urlOfUserSolutions
      );

      for (const problem of res.data) {
        const { problemId } = problem;
        newSolvedProblemIds.add(problemId);
      }
      //返り値がいらないのでawaitする必要なさそう
      docRef.set({ solvedProblems: [...newSolvedProblemIds] });
      setProblemIds([newSolvedProblemIds]);
    } catch (error) {
      console.error(error);
    }
    return;
  };

  return {
    aojUser,
    setAOJUser,
    setAOJUserOnFirestore,
    client,
    solvedProblemIds
  };
};

export const AOJContainer = createContainer(useAOJContainer);

export default AOJContainer;
