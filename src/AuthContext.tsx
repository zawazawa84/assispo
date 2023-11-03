'use client';

import { createContext, useState, useContext, useEffect } from 'react';
import { getAuth, onAuthStateChanged, User } from 'firebase/auth';
import { auth, db } from './lib/firebase/sdk';
import { doc, getDoc, DocumentData } from 'firebase/firestore';

export interface UserData {
  address: string;
  birthday: string;
  club: string;
  email: string;
  name: string;
  phoneNumber: number;
  size: string;
}

type AuthContextType = {
  user: User | null;
  userData: UserData | null;
};

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined,
);

export function useAuthContext() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [userData, setUserData] = useState<UserData | null>(null);
  const value = {
    user: user,
    userData: userData,
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setUser(user);
      if (user) {
        const docRef = doc(db, 'users', `${user.uid}`);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setUserData(docSnap.data() as UserData);
        } else {
          setUserData(null);
        }
      }
    });
    return () => {
      unsubscribe();
    };
  }, []);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
