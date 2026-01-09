import { setupUI, render } from "./ui/ui.js";
import { login } from "./auth/auth.js";
//auth function with defaut login and password
login("admin", "123");

setupUI();
render();
