/* eslint-disable react/prop-types */
import React, { useEffect } from "react";
import { useState } from "react";
import { createContext } from "react";
import {
  createUserWithEmailAndPassword,
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import app from "../firebase/firebase.config";

// import---end
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
export const AuthContext = createContext();
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // create user
  const creteUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  // login user email and password
  const login = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  // sing up gmail
  const singUpWithGmail = () => {
    return signInWithPopup(auth, googleProvider);
  };

  // logout
  const logout = () => {
    return signOut(auth);
  };
  // update profile
  const updateUserProfile = ({ name, photoURL }) => {
    return updateProfile(auth, auth.currentUser, {
      displayName: name,
      photoURL: photoURL,
    });
  };

  // check singed user
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        setLoading(false);
        // ...
      } else {
        // User is signed out
        // ...
      }
      return () => {
        return unsubscribe();
      };
    });
  }, []);

  const authInfo = {
    user,
    creteUser,
    login,
    singUpWithGmail,
    logout,
    updateUserProfile,
    loading,
  };
  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
