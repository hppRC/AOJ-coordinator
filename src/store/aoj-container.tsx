import axios from 'axios';
import firebase from 'firebase/app';
import { useEffect, useState } from 'react';
import { FirebaseAuthContainer } from 'src/store';
import { AOJUser } from 'types/models';
import { createContainer } from 'unstated-next';

const AOJUserDocRef = (uid: string) =>
  firebase
    .firestore()
    .collection(`users`)
    .doc(uid)
    .collection(`aoj_data`)
    .doc('userData');

const useAOJContainer = () => {
  const { user } = FirebaseAuthContainer.useContainer();
  const [aojUser, setAOJUser] = useState<AOJUser | null>();
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
    };
  }, []);

  const setAOJUserOnFirestore = async (userData: AOJUser) => {
    if (!userData) return;
    if (!user) return;
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
          console.error('Error add todo to Firebase Database', error);
        });
    } else {
      docRef
        .set({
          data: userData,
          createdAt: firebase.firestore.FieldValue.serverTimestamp(),
          updatedAt: firebase.firestore.FieldValue.serverTimestamp()
        })
        .catch(error => {
          console.error('Error add todo to Firebase Database', error);
        });
    }

    setAOJUser(userData);

    return;
  };

  //const setProblems = async () => {};

  return { aojUser, setAOJUser, setAOJUserOnFirestore, client };
};

export const AOJContainer = createContainer(useAOJContainer);

export default AOJContainer;
