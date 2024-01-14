import {
  GithubAuthProvider,
  GoogleAuthProvider,
  signInAnonymously,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "../firebase/firebase";
import { FirebaseError } from "@firebase/util";

export async function loginGoogle() {
  const provider = new GoogleAuthProvider();
  const result = await signInWithPopup(auth, provider);
  const token = await result.user.getIdToken();
  localStorage.setItem("token", token);
  return result.user;
}

export async function loginGithub() {
  const provider = new GithubAuthProvider();
  const result = await signInWithPopup(auth, provider);
  const token = await result.user.getIdToken();
  localStorage.setItem("token", token);
  return result.user;
}

export async function loginAnonymous() {
  const result = await signInAnonymously(auth);
  const token = await result.user.getIdToken();
  localStorage.setItem("token", token);
  return result.user;
}
