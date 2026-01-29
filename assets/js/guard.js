import { auth } from "./firebase.js";

const ADMIN_EMAIL = "higuysdorobloxjoaopk@gmail.com";

setInterval(() => {
  const user = auth.currentUser;
  if (!user || user.email !== ADMIN_EMAIL) {
    location.href = "game.html";
  }
}, 300);
