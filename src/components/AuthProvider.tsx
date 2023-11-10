import {
  GithubAuthProvider,
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
} from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";

export interface AuthContext {
  displayName: string | null;
  userId: string | null;
  signInWithGoogle: () => void;
  signInWithGitHub: () => void;
  signOut: () => void;
}

const authContext = createContext<AuthContext | null>(null);

export interface AuthProviderProps {
  children?: JSX.Element;
}

export function AuthProvider(props: AuthProviderProps) {
  const [userId, setUserId] = useState<string | null>(null);
  const [displayName, setDisplayName] = useState<string | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    return getAuth().onAuthStateChanged((user) => {
      if (user) {
        setUserId(user.uid);
        setDisplayName(user.displayName);
      } else {
        setUserId(null);
        setDisplayName(null);
      }
      setIsInitialized(true);
    });
  }, []);

  return (
    <authContext.Provider
      value={{
        userId,
        displayName,
        signInWithGoogle,
        signInWithGitHub,
        signOut,
      }}
    >
      {isInitialized ? props.children : null}
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

function signInWithGoogle() {
  return signInWithPopup(getAuth(), new GoogleAuthProvider());
}

function signInWithGitHub() {
  return signInWithPopup(getAuth(), new GithubAuthProvider());
}

function signOut() {
  return getAuth().signOut();
}
