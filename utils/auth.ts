import {
  GithubAuthProvider,
  GoogleAuthProvider,
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
  // try {
  const result = await signInWithPopup(auth, provider);
  const token = await result.user.getIdToken();
  localStorage.setItem("token", token);
  return result.user;
  // } catch (error: unknown) {
  //   if (error instanceof FirebaseError) {
  //     console.error(error.code);
  //     return error.code;
  //   } else return "я хз что тут";
  // }
}

export async function loginAnonymous() {}
