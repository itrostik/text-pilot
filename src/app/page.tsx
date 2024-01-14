"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

import { jwtDecode, JwtPayload } from "jwt-decode";
import { userType } from "../../types/userType";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase/firebase";
import { useUser } from "../../hooks/useUser";

export default function Home() {
  const { user, setUser } = useUser();
  const [openModal, setOpenModal] = useState<boolean>(false);

  const router = useRouter();

  function toggleModal() {
    setOpenModal(!openModal);
  }

  function linkProfile() {
    router.push(`/profile/${user?.user_id}`);
  }

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
              "flex justify-between p-2 border-solid border-2 rounded-xl border-white text-white"
            }
          >
            <div>
              <Image src={"/logo.svg"} width={40} height={40} alt={"logo"} />
            </div>
            <div
              className={
                "flex gap-2 items-center justify-end mx-3 relative cursor-pointer"
              }
              onClick={toggleModal}
            >
              <span>{user.name ? user.name : "Гость"}</span>
              {user.picture ? (
                <Image
                  src={user.picture}
                  alt=""
                  width={30}
                  height={30}
                  className={"rounded-full"}
                />
              ) : (
                <Image src={"/anonymous.svg"} alt={""} width={30} height={30} />
              )}
              {openModal ? (
                <div
                  className={
                    "absolute -bottom-20 right-0 rounded-xl bg-white p-1 text-black"
                  }
                >
                  <div
                    className={
                      "mx-3 bg-white p-1 rounded cursor-pointer hover:bg-gray-500"
                    }
                    onClick={() => linkProfile()}
                  >
                    Профиль
                  </div>
                  <div
                    onClick={() => logout()}
                    className={
                      "mx-3 bg-white p-1 rounded cursor-pointer hover:bg-gray-500"
                    }
                  >
                    Выйти
                  </div>
                </div>
              ) : (
                ""
              )}
            </div>
          </header>
          <main className={"flex-1"}>52</main>
          <footer
            className={
              "flex justify-center items-center font-bold p-2 border-solid border-2 rounded-xl border-white"
            }
          >
            created by itrostik
          </footer>
        </div>
      )}
    </>
  );
}
