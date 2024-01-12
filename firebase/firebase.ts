import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import "dotenv/config";
import { getFirestore } from "firebase/firestore";

//конфиг firebase
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_MEASUREMENT_ID,
};

//инициализация firebase
const app = initializeApp(firebaseConfig);

//авторизация через firebase
export const auth = getAuth();

//хранилище данных firestore
export const db = getFirestore(app);

//конфиг для авторизации через email
export const actionCodeSettings = {
  // URL you want to redirect back to. The domain (www.example.com) for this
  // URL must be in the authorized domains list in the Firebase Console.
  url: "http://localhost:3000",
  // This must be true.
  handleCodeInApp: true,
  // iOS: {
  //   bundleId: "com.example.ios",
  // },
  // android: {
  //   packageName: "com.example.android",
  //   installApp: true,
  //   minimumVersion: "12",
  // },
  // dynamicLinkDomain: "example.page.link",
};
