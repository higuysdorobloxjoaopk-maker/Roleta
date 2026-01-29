import { auth, db } from "./firebase.js";
import { doc, getDoc, updateDoc } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-firestore.js";
import { animateCoins } from "./coins.js";

const emojis = [
  { icon: "🍒", value: 1 },
  { icon: "🍋", value: 2 },
  { icon: "🍉", value: 3 },
  { icon: "🔔", value: 9 }
];

let spinning = false;

window.spin = async () => {
  if (spinning) return;
  spinning = true;
  spinBtn.disabled = true;
  spinBtn.style.opacity = "0.5";

  const userRef = doc(db, "users", auth.currentUser.uid);
  const snap = await getDoc(userRef);
  let coins = snap.data().coins;

  if (coins < 3) {
    spinning = false;
    spinBtn.disabled = false;
    return;
  }

  await updateDoc(userRef, { coins: coins - 3 });
  animateCoins(-3);

  const r1 = emojis[Math.floor(Math.random() * emojis.length)];
  const r2 = emojis[Math.floor(Math.random() * emojis.length)];
  const r3 = emojis[Math.floor(Math.random() * emojis.length)];

  roda1.textContent = r1.icon;
  roda2.textContent = r2.icon;
  roda3.textContent = r3.icon;

  let ganho = 0;

  if (r1.value === r2.value && r2.value === r3.value) {
    ganho = r1.icon === "🔔" ? 450 : 300;
  } else if (r1.value === r2.value || r1.value === r3.value || r2.value === r3.value) {
    ganho = 2;
  } else {
    ganho = -50;
  }

  setTimeout(async () => {
    await updateDoc(userRef, { coins: coins - 3 + ganho });
    animateCoins(ganho);
    spinning = false;
    spinBtn.disabled = false;
    spinBtn.style.opacity = "1";
  }, 1200);
};
