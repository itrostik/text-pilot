"use client";
import React from "react";
import { useUser } from "../../../../hooks/useUser";
import Image from "next/image";
import Loading from "@/components/Loading";

export default function Page() {
  const { user, setUser } = useUser();
  return (
    <>
      {user ? (
        <div
          className={
            "text-white w-full h-screen flex flex-col gap-10 items-center justify-center"
          }
        >
          <div>
            <Image
              src={"/logo.svg"}
              alt={"user"}
              width={100}
              height={100}
              priority
              className={"rounded-full"}
            />
          </div>
          <div className={"flex-col items-center justify-center"}>
            <Image
              src={user?.picture ? user.picture : "/anonymous.svg"}
              alt={"user"}
              width={300}
              height={300}
              priority
              className={"rounded-full"}
            />
            <div>{user.name}</div>
          </div>
        </div>
      ) : (
        <Loading />
      )}
    </>
  );
}
