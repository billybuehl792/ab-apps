import { auth } from ".";
import { signInWithEmailAndPassword, signOut as _signOut } from "firebase/auth";

const signIn = async (email: string, password: string) =>
  await signInWithEmailAndPassword(auth, email, password);

const signOut = async () => await _signOut(auth);

export { signIn, signOut };
