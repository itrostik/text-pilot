"use client";

import React, { useEffect, useState } from "react";
import {
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,
  User,
} from "firebase/auth";

import { auth } from "../../../firebase/firebase";
import Image from "next/image";
import { userType } from "../../../types/userType";

export default function Page() {
  const [user, setUser] = useState<userType | null>(null);

  async function login() {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    setUser({
      photoURL: result.user.photoURL,
      displayName: result.user.displayName,
    });
  }

  async function logout() {
    await signOut(auth);
  }

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (currentUser) => {
      setUser({
        photoURL: currentUser?.photoURL,
        displayName: currentUser?.displayName,
      });
    });
    return () => unsub();
  }, [user]);

  return (
    <>
      {!user ? (
        <div onClick={() => login()}>Войти с помощью гугл</div>
      ) : (
        <div>
          {user.displayName}
          {user.photoURL && (
            <Image src={user.photoURL} alt="" width={30} height={30} />
          )}
          <div onClick={() => logout()}>Выйти</div>
        </div>
      )}
    </>
  );
}
