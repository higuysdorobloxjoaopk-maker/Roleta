import { auth, db } from "./firebase.js";
import { doc, getDoc } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-firestore.js";

export async function animateCoins(delta) {
  const ref = doc(db, "users", auth.currentUser.uid);
  const snap = await getDoc(ref);
  let current = snap.data().coins - delta;
  let target = snap.data().coins;

  const step = delta > 0 ? 1 : -1;

  const interval = setInterval(() => {
    current += step;
    coinDisplay.textContent = current;

    if (current === target) clearInterval(interval);
  }, 20);
}
