"use client";

import React, { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";

import { auth } from "../../../firebase/firebase";
import Image from "next/image";
import { userType } from "../../../types/userType";
import { useRouter } from "next/navigation";
import { loginAnonymous, loginGithub, loginGoogle } from "../../../utils/auth";

import Loading from "@/components/Loading";
import { useUser } from "../../../hooks/useUser";

export default function Page() {
  const { user, setUser } = useUser();
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();
  async function login(typeAuth: "google" | "github" | "anonymous") {
    setLoading(true);
    let user;
    if (typeAuth === "google") user = await loginGoogle();
    else if (typeAuth === "github") {
      user = await loginGithub();
    } else user = await loginAnonymous();
    if (user) {
      setUser({
        picture: user.photoURL,
        name: user.displayName,
        user_id: user.uid,
        email: user.email,
      });
    }
    setLoading(false);
  }
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        const user: userType = {
          picture: currentUser.photoURL,
          name: currentUser.displayName,
          user_id: currentUser.uid,
          email: currentUser.email,
        };
        setUser(user);
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
    <>
      {!loading ? (
        <div
          className={
            "bg-black h-screen w-full flex flex-col gap-5 items-center justify-center text-white"
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
              <span className={"text-white font-medium"}>Вход</span>
              <div className={"flex gap-2"}>
                <div
                  onClick={() => login("google")}
                  className={
                    "bg-white cursor-pointer flex p-2 gap-2 items-center rounded"
                  }
                >
                  <Image
                    src={"/google.svg"}
                    width={45}
                    height={45}
                    alt={"google"}
                    className={"p-1"}
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
                    width={45}
                    height={45}
                    alt={"github"}
                  />
                </div>
                <div
                  onClick={() => login("anonymous")}
                  className={
                    "bg-white cursor-pointer flex p-2 gap-2 items-center rounded"
                  }
                >
                  <Image
                    src={"/anonymous.svg"}
                    width={45}
                    height={45}
                    alt={"google"}
                  />
                </div>
              </div>
            </>
          )}
        </div>
      ) : (
        <Loading />
      )}
    </>
  );
}
