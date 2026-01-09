import { getTodos, addTodo, toggleTodo } from "../todo/todo.js";

export async function render() {
  const list = document.querySelector("#list");
  list.innerHTML = "";

  try {
    const todos = await getTodos();

    todos.forEach((todo) => {
      const li = document.createElement("li");
      li.textContent = todo.done ? ` ${todo.title}` : todo.title;

      li.onclick = async () => {
        try {
          await toggleTodo(todo.id);
          render();
        } catch (err) {
          handleAuthError(err);
        }
      };

      list.appendChild(li);
    });
  } catch (err) {
    handleAuthError(err);
  }
}

export function setupUI() {
  document.querySelector("#add").onclick = async () => {
    const input = document.querySelector("#input");
    if (!input.value.trim()) return;
    try {
      await addTodo(input.value);
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
