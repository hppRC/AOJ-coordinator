import firebase from 'firebase/app';
import { WrapRootElement, WrapPageElement } from 'src/components';

export const wrapRootElement = WrapRootElement;
export const wrapPageElement = WrapPageElement;

export const onClientEntry = () => {
  firebase.initializeApp({
    apiKey: 'AIzaSyC7YBeBvin3Gw9KQ7iXo5KJhkmJzLj9Pm4',
    authDomain: 'gatsby-firebase-skeleton.firebaseapp.com',
    databaseURL: 'https://gatsby-firebase-skeleton.firebaseio.com',
    projectId: 'gatsby-firebase-skeleton',
    storageBucket: 'gatsby-firebase-skeleton.appspot.com',
    messagingSenderId: '969602248460',
    appId: '1:969602248460:web:3691b4c8bef7f5c7ad2329',
    measurementId: 'G-665ESWY34D'
  });
};
