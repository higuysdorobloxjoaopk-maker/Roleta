import { db } from "./firebase.js";
import { collection, addDoc, query, getDocs, updateDoc } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-firestore.js";

window.runCommand = async () => {
  const cmd = command.value.split(" ");
  if (cmd[0] !== "/coin") return;

  const name = cmd[1];
  const value = parseInt(cmd[2]);

  const q = query(collection(db, "users"));
  const users = await getDocs(q);

  users.forEach(async u => {
    if (u.data().name === name) {
      await updateDoc(u.ref, { coins: value });
      await addDoc(collection(db, "logs"), {
        message: `[🪙] ${name} moedas setadas para ${value}`,
        createdAt: Date.now()
      });
    }
  });
};
