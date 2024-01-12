import React, { SetStateAction } from "react";
import { loginEmail } from "../../utils/auth";
import { userType } from "../../types/userType";

export default function Form({
  setUser,
}: {
  setUser: React.Dispatch<React.SetStateAction<userType | null>>;
}) {
  async function login() {
    const user = await loginEmail();
    setUser(user);
  }

  return (
    <div>
      <form className={"flex flex-col gap-3 w-96"}>
        <input
          type="email"
          placeholder={"Введите email"}
          className={"p-2 rounded w-full bg-white"}
        />
        <input
          type="password"
          placeholder={"Введите пароль"}
          className={"p-2 rounded w-full bg-white"}
        />
        <button
          className={"p-2 rounded w-full bg-white"}
          onClick={() => login()}
        >
          Войти
        </button>
      </form>
    </div>
  );
}
