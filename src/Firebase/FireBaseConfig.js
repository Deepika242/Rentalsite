import { getAuth } from "firebase/auth";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyDbNLj3DOUmj6J6S9CiLu51y-51a6xHMkc",
  authDomain: "sign-project-6c8da.firebaseapp.com",
  projectId: "sign-project-6c8da",
  storageBucket: "sign-project-6c8da.appspot.com",
  messagingSenderId: "863963712304",
  appId: "1:863963712304:web:ea85d04527a7de93f0d6f5",
};
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;
