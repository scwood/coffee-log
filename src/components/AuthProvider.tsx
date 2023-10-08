import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";

export interface AuthContext {
  displayName: string | null;
  userId: string | null;
  signIn: () => void;
  signOut: () => void;
}

const authContext = createContext<AuthContext | undefined>(undefined);

export interface AuthProviderProps {
  children?: JSX.Element;
}

export function AuthProvider(props: AuthProviderProps) {
  const [userId, setUserId] = useState<string | null>(null);
  const [displayName, setDisplayName] = useState<string | null>(null);

  useEffect(() => {
    return getAuth().onAuthStateChanged((user) => {
      if (user) {
        setUserId(user.uid);
        setDisplayName(user.displayName);
      } else {
        setUserId(null);
        setDisplayName(null);
      }
    });
  }, []);

  return (
    <authContext.Provider value={{ userId, displayName, signIn, signOut }}>
      {props.children}
    </authContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(authContext);

  if (!context) {
    throw new Error("useAuth must be used inside an AuthProvider");
  }

  return context;
}

function signIn() {
  return signInWithPopup(getAuth(), new GoogleAuthProvider());
}

function signOut() {
  return getAuth().signOut();
}
