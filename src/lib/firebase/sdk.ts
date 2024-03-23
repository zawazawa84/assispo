import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
// import { getAnalytics } from 'firebase/analytics';

let firebaseConfig;
if (process.env.NODE_ENV === 'production') {
  firebaseConfig = {
    apiKey: 'AIzaSyDlpO7LD5tjic8GIY8DH3CeWoucRzGgYPA',
    authDomain: 'asispo-78656.firebaseapp.com',
    projectId: 'asispo-78656',
    storageBucket: 'asispo-78656.appspot.com',
    messagingSenderId: '491602287606',
    appId: '1:491602287606:web:3ae69c3da6f533405645d7',
    measurementId: 'G-2156GGVN0T',
  };
} else {
  firebaseConfig = {
    apiKey: 'AIzaSyAcbMlwWvUORBf_HSurF8weW9hP-nHzzNA',
    authDomain: 'assispo-a2907.firebaseapp.com',
    projectId: 'assispo-a2907',
    storageBucket: 'assispo-a2907.appspot.com',
    messagingSenderId: '361701071989',
    appId: '1:361701071989:web:0100a845508938c1b96c3c',
    measurementId: 'G-C500MNKGPD',
  };
}

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
// export const analytics = getAnalytics(app);
export const auth = getAuth(app);
