// AuthProvider.jsx

import React, { createContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import app from "../firebase/firebase.config";


import axios from 'axios';

export const AuthContext = createContext();
const auth = getAuth(app);

// const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);

//   //create an account
//   const createUser = async (email, password) => {
//     try {
//       const userCredential = await createUserWithEmailAndPassword(auth, email, password);
//       setUser(userCredential.user);
//       return userCredential; // return user credential
//     } catch (error) {
//       throw error;
//     }
//   };

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const createUser = async (email, password, name, telephone) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      // Update profile with name (optional)
      await updateProfile(auth.currentUser, { displayName: name });
      await updateProfile(auth.currentUser, { telephone: telephone });
      
      setUser(userCredential.user);
      return userCredential;
    } catch (error) {
      throw error;
    }
  };

  // login using email & password
  const login = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  // logout
  const logOut = () => {
    return signOut(auth);
  };

  //update profile
  const updateUserProfile = (name, photoURL, telephone) => {
    return updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: photoURL,
      telephone: telephone,
    });
  };

 useEffect( () =>{
        const unsubscribe = onAuthStateChanged(auth, currentUser =>{
            // console.log(currentUser);
            setUser(currentUser);
            if(currentUser){
              const userInfo = {email: currentUser.email}
            axios.post('http://localhost:6001/jwt', userInfo)
            .then((response) =>  {
              // console.log(response.data.token);
              if(response.data.token){
                localStorage.setItem("access-token", response.data.token)
              }
            })

            } else{
              localStorage.removeItem("access-token")
            }
            
            setLoading(false);
        });

        return () =>{
            return unsubscribe();
        }
    }, [])

    
  

  const authInfo = {
    user,
    createUser,
    login,
    logOut,
    updateUserProfile,
    loading
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
 