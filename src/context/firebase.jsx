import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAY4BoTL-gCsGMxZATd58-z_idAX-og3l8",
  authDomain: "whatsapp-clone-8e3d2.firebaseapp.com",
  projectId: "whatsapp-clone-8e3d2",
  storageBucket: "whatsapp-clone-8e3d2.appspot.com",
  messagingSenderId: "377092801867",
  appId: "1:377092801867:web:80a3d79b8a759eef9254ce",
  measurementId: "G-SNSMB60F4P"
};


export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const db = getFirestore(app)