import { collection, addDoc, query, where, getDocs } from "firebase/firestore";
import { db } from "../firebase/firebase";
import { userType } from "../types/userType";

export async function addUser(
  data: userType,
  accountDomain: string,
): Promise<void> {
  try {
    await addDoc(collection(db, "users"), {
      ...data,
      domain: accountDomain,
    });
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}

export async function findUser(
  email: string,
  accountDomain: string,
): Promise<boolean> {
  const q = query(
    collection(db, "users"),
    where("email", "==", email),
    where("domain", "==", accountDomain),
  );
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.length !== 0;
}
