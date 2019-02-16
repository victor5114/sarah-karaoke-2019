import * as firebase from 'firebase/app';
import 'firebase/firestore';

console.log(process.env.FIREBASE_API_KEY);
firebase.initializeApp({
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
});

export default firebase.firestore();
