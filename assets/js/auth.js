import { auth, db } from "./firebase.js";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/10.7.0/firebase-auth.js";

import { doc, setDoc, getDoc } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-firestore.js";

window.register = async () => {
  const name = nome.value;
  const email = emailInput.value;
  const pass = senha.value;

  const res = await createUserWithEmailAndPassword(auth, email, pass);

  await setDoc(doc(db, "users", res.user.uid), {
    name,
    email,
    coins: 120,
    createdAt: Date.now()
  });

  location.href = "game.html";
};

window.login = async () => {
  await signInWithEmailAndPassword(auth, emailInput.value, senha.value);
  location.href = "game.html";
};
