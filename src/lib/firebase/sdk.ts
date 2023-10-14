import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
// import { getAnalytics } from 'firebase/analytics';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyAcbMlwWvUORBf_HSurF8weW9hP-nHzzNA',
  authDomain: 'assispo-a2907.firebaseapp.com',
  projectId: 'assispo-a2907',
  storageBucket: 'assispo-a2907.appspot.com',
  messagingSenderId: '361701071989',
  appId: '1:361701071989:web:0100a845508938c1b96c3c',
  measurementId: 'G-C500MNKGPD',
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
// export const analytics = getAnalytics(app);
export const auth = getAuth(app);
