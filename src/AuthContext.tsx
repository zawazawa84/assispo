'use client';

import { createContext, useState, useContext, useEffect } from 'react';
import { getAuth, onAuthStateChanged, User } from 'firebase/auth';
import { auth } from './lib/firebase/sdk';

type AuthContextType = {
  user: User | null;
};

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined,
);

export function useAuthContext() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const value = {
    user: user,
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      console.log(user);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
