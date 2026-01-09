import { setupUI, render } from "./ui/ui.js";
import { login } from "./auth/auth.js";

login("admin", "123");

setupUI();
render();
