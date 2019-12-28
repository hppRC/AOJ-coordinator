import axios, { AxiosResponse } from 'axios';
import firebase from 'firebase/app';
import { useEffect, useState } from 'react';
import { FirebaseAuthContainer } from 'src/store';
import { AOJUser, Problem } from 'types/models';
import { createContainer } from 'unstated-next';

const AOJUserDocRef = (uid: string) =>
  firebase
    .firestore()
    .collection(`users`)
    .doc(uid)
    .collection(`aoj_data`)
    .doc('userData');

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
        const docRef = AOJUserDocRef(user.uid);
        const userData = (await docRef.get()).data();
        setAOJUser(userData?.data);
      } else {
        console.log('not login');
      }
    });

    return () => {
      unsubscribe();
      setAOJUser(null);
    };
  }, []);

  const setAOJUserOnFirestore = async (userData: AOJUser) => {
    if (!userData || !user) return;
    //if (aojUser?.id === userData.id) return;

    const { uid } = user;

    const docRef = AOJUserDocRef(uid);
    const doc = await docRef.get();

    if (doc.exists) {
      docRef
        .update({
          data: userData,
          updatedAt: firebase.firestore.FieldValue.serverTimestamp()
        })
        .catch(error => {
          console.error(
            'document exists but error occured on Update useData',
            error
          );
        });
    } else {
      docRef
        .set({
          data: userData,
          createdAt: firebase.firestore.FieldValue.serverTimestamp(),
          updatedAt: firebase.firestore.FieldValue.serverTimestamp()
        })
        .catch(error => {
          console.error(
            "document dosen't exists but error occured on Update useData",
            error
          );
        });
    }

    setAOJUser(userData);
    await initProblemsOnFirestore(userData.id);

    return;
  };

  const initProblemsOnFirestore = async (aojUserId: string) => {
    if (!user) return;
    const { uid } = user;

    const collection = firebase
      .firestore()
      .collection(`users`)
      .doc(uid)
      .collection(`solved_problems`);

    try {
      //この関数が呼ばれる時は初期化したいとき(AOJ user id の登録・変更)に限るので、もともとあるデータ(間違ってるデータ)は全部削除
      (await collection.get()).docs.forEach(doc => {
        collection.doc(doc.id).delete();
      });
      //解いた問題を詰め直す用
      const newSolvedProblemIds = new Set<string>();

      //AOJのAPIから指定ユーザの解答情報を全部取ってくる
      const url = `https://judgeapi.u-aizu.ac.jp/solutions/users/${aojUserId}?size=5000`;
      const res: AxiosResponse<Problem[]> = await client.get(url);

      for await (const problem of res.data) {
        const { problemId } = problem;
        newSolvedProblemIds.add(problemId);
        await collection
          .add({
            problemId,
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
            updatedAt: firebase.firestore.FieldValue.serverTimestamp()
          })
          .catch(error => {
            console.error('Error add todo to Firebase Database', error);
          });
      }
      setProblemIds([newSolvedProblemIds]);
    } catch (error) {
      console.error(error);
    }
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
