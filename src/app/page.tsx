"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

import { jwtDecode, JwtPayload } from "jwt-decode";
import { userType } from "../../types/userType";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase/firebase";

export default function Home() {
  const [user, setUser] = useState<userType | null>(null);

  const router = useRouter();
  if (!localStorage.getItem("token")) {
  }

  useEffect(() => {
    if (localStorage.getItem("token")) {
      const token = localStorage.getItem("token")!;
      const decoded = jwtDecode<JwtPayload & userType>(token);
      setUser({
        picture: decoded.picture,
        name: decoded.name,
        user_id: decoded.user_id,
        email: decoded.email,
      });
    } else {
      router.push("/auth");
    }
  }, [router]);

  async function logout() {
    try {
      await signOut(auth);
      localStorage.removeItem("token");
      setUser(null);
      router.push("/auth");
    } catch (e) {
      console.error(e);
    }
  }

  return (
    <>
      {user && (
        <div
          className={"bg-black w-full h-screen p-3 text-white flex flex-col"}
        >
          <header
            className={
              "flex justify-between p-2 border-solid border-2 rounded-3xl border-white text-white"
            }
          >
            <div>
              <Image src={"/logo.svg"} width={40} height={40} alt={"logo"} />
            </div>
            <div className={"flex gap-2 items-center justify-end"}>
              <span>{user.name}</span>
              {user.picture && (
                <Image
                  src={user.picture}
                  alt=""
                  width={30}
                  height={30}
                  className={"rounded-full"}
                />
              )}
              <div
                onClick={() => logout()}
                className={
                  "mx-3 bg-white text-black p-1 rounded cursor-pointer hover:bg-opacity-70"
                }
              >
                Выйти
              </div>
            </div>
          </header>
          <main className={"flex-1"}>52</main>
          <footer
            className={
              "flex justify-center items-center font-bold p-2 border-solid border-2 rounded-3xl border-white"
            }
          >
            created by itrostik
          </footer>
        </div>
      )}
    </>
  );
}
