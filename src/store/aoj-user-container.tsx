import firebase from 'firebase/app';
import { useState } from 'react';
import { AOJUser } from 'types/models';
import { createContainer } from 'unstated-next';

const useAOJUserContainer = () => {
  const [aojUser, setAOJUser] = useState<AOJUser | null>();

  const setAOJUserOnFirestore = async (uid: string, userData: AOJUser) => {
    if (!userData) return;

    console.log('setAOJUserOnFirebase\n', userData);

    const docRef = await firebase
      .firestore()
      .collection(`users`)
      .doc(uid)
      .collection(`aoj_data`)
      .doc('userData');

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
