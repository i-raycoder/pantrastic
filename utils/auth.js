// auth.js
import { auth } from './firebase';

export const signIn = async () => {
  try {
    const provider = new firebase.auth.GoogleAuthProvider();
    const result = await auth.signInWithPopup(provider);
    return result.user;
  } catch (error) {
    console.error(error);
  }
};

export const signOut = async () => {
  try {
    await auth.signOut();
  } catch (error) {
    console.error(error);
  }
};