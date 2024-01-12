"use client";

import React, { useEffect, useState } from "react";
import {
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,
  GithubAuthProvider,
  isSignInWithEmailLink,
  signInWithEmailLink,
} from "firebase/auth";

import Form from "@/components/Form";

import { auth } from "../../../firebase/firebase";
import Image from "next/image";
import { userType } from "../../../types/userType";
import { useRouter } from "next/navigation";
import { addUser, findUser } from "../../../utils/firestore";
import { loginEmail, loginGithub, loginGoogle } from "../../../utils/auth";

export default function Page() {
  const [user, setUser] = useState<userType | null>(null);

  const router = useRouter();

  async function login(typeAuth: string) {
    let user = null;
    if (typeAuth === "google") user = await loginGoogle();
    else if (typeAuth === "github") user = await loginGithub();

    // const provider = new GoogleAuthProvider();
    // const result = await signInWithPopup(auth, provider);
    // const token = await result.user.getIdToken();
    // localStorage.setItem("token", token);
    // setUser({
    //   picture: result.user.photoURL,
    //   name: result.user.displayName,
    //   user_id: result.user.uid,
    // });
    // console.log(result);
    if (user) {
      setUser({
        picture: user.photoURL,
        name: user.displayName,
        user_id: user.uid,
        email: user.email,
      });
    }
  }

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        const providerId = currentUser.providerData[0].providerId;
        const providerEmail = currentUser.providerData[0].email;
        const user: userType = {
          picture: currentUser.photoURL,
          name: currentUser.displayName,
          user_id: currentUser.uid,
          email: currentUser.email ? currentUser.email : providerEmail,
        };
        setUser(user);
        if (user.email && !(await findUser(user.email, providerId))) {
          await addUser(user, providerId);
        } else if (providerEmail) {
          if (!(await findUser(providerEmail, providerId))) {
            const bufferUser = {
              ...user,
              email: providerEmail,
            };
            await addUser(bufferUser, providerId);
          }
        }
      } else {
        setUser(null);
      }
    });
    return () => unsub();
  }, []);

  useEffect(() => {
    if (user) {
      router.push("/");
    }
  }, [router, user]);

  return (
    <div
      className={
        "bg-black h-screen w-full flex flex-col gap-5 items-center justify-center"
      }
    >
      {!user && (
        <>
          <Image
            src={"/logo.svg"}
            width={100}
            height={100}
            alt={"52"}
            priority
          />
          <span className={"text-white font-medium"}>Авторизация</span>

          <Form setUser={setUser} />

          <span className={"text-white"}>или</span>

          <div className={"flex gap-2"}>
            <div
              onClick={() => login("google")}
              className={
                "bg-white cursor-pointer flex p-2 gap-2 items-center rounded"
              }
            >
              <Image
                src={"/google.svg"}
                width={25}
                height={25}
                alt={"google"}
              />
            </div>
            <div
              onClick={() => login("github")}
              className={
                "bg-white cursor-pointer flex p-2 gap-2 items-center rounded"
              }
            >
              <Image
                src={"/github.svg"}
                width={30}
                height={30}
                alt={"google"}
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
}
