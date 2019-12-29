import firebase from 'firebase/app';
import { WrapRootElement, WrapPageElement } from 'src/components';

export const wrapRootElement = WrapRootElement;
export const wrapPageElement = WrapPageElement;

export const onClientEntry = () => {
  firebase.initializeApp({
    apiKey: 'AIzaSyB8wq7mhjaS6B4bvIGCAUTYCk0FfoWOfzA',
    authDomain: 'aoj-coordinator.firebaseapp.com',
    databaseURL: 'https://aoj-coordinator.firebaseio.com',
    projectId: 'aoj-coordinator',
    storageBucket: 'aoj-coordinator.appspot.com',
    messagingSenderId: '14834621237',
    appId: '1:14834621237:web:f86f011333453337ea8a7c',
    measurementId: 'G-1EQ93X91FR'
  });
};
