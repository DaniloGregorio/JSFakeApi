import { Login } from "../auth/auth.js";
import { getTasks, addTask, toggleTask } from "../tasks/tasks.js";

export function setupUI() {
  document.querySelector("#add").onclick = async () => {
    const input = document.querySelector("#input");
    if (!input.value.trim()) return;
    try {
      await addTask(input.value);
      input.value = "";
      render();
    } catch (err) {
      handleAuthError(err);
    }
  };
}
function handleAuthError(err) {
  if (err?.status === 401) {
    console.log("not authenticated");
  } else {
    console.error(err);
  }
}

export function LoginData() {
  document.querySelector("#login").onclick = async () => {
    const user = {
      name: document.querySelector("#loginname").value,
      pass: document.querySelector("loginpass").value,
    };

    if (!dataInput.value.trim()) return;
    try {
      const result = Login({ user });
      if (result == true) {
        await addTask(user.name, user.pass);
      }
    } catch (err) {
      handleAuthError(err);
    }
  };
}
