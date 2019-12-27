import firebase from 'firebase/app';
import { WrapRootElement, WrapPageElement } from 'src/components';

export const wrapRootElement = WrapRootElement;
export const wrapPageElement = WrapPageElement;

export const onClientEntry = () => {
  firebase.initializeApp({
    apiKey: 'AIzaSyCFh7xKWn89QPeFFHvqgh5-NG5Ze5doawY',
    authDomain: 'aoj-cordinator.firebaseapp.com',
    databaseURL: 'https://aoj-cordinator.firebaseio.com',
    projectId: 'aoj-cordinator',
    storageBucket: 'aoj-cordinator.appspot.com',
    messagingSenderId: '875646715312',
    appId: '1:875646715312:web:4159d8c6f356e5711b4275',
    measurementId: 'G-LZ27KQZD9K'
  });
};
