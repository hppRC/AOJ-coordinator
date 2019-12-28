import firebase from 'firebase/app';
import { useEffect, useState } from 'react';
import { AOJUser } from 'types/models';
import { createContainer } from 'unstated-next';

const AOJUserDocRef = (uid: string) =>
  firebase
    .firestore()
    .collection(`users`)
    .doc(uid)
    .collection(`aoj_data`)
    .doc('userData');

const useAOJUserContainer = () => {
  const [aojUser, setAOJUser] = useState<AOJUser | null>();

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

  const setAOJUserOnFirestore = async (uid: string, userData: AOJUser) => {
    if (!userData) return;

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

  return { aojUser, setAOJUser, setAOJUserOnFirestore };
};

export const AOJUserContainer = createContainer(useAOJUserContainer);

export default AOJUserContainer;
