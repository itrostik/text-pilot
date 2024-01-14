import { useEffect, useState } from "react";
import { userType } from "../types/userType";
import { useRouter } from "next/navigation";
import { jwtDecode, JwtPayload } from "jwt-decode";

export function useUser() {
  const [user, setUser] = useState<userType | null>(null);
  const router = useRouter();
  useEffect(() => {
    if (localStorage.getItem("token")) {
      const token = localStorage.getItem("token")!;
      const decoded = jwtDecode<JwtPayload & userType>(token);
      setUser({
        picture: decoded.picture
          ? decoded.picture.split("=")[0] + "=s2000-c"
          : "/anonymous.svg",
        name: decoded.name ? decoded.name : "Гость",
        user_id: decoded.user_id,
        email: decoded.email,
      });
    } else {
      router.push("/auth");
    }
  }, [router]);

  return { user, setUser };
}
