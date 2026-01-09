import { getTodos, addTodo, toggleTodo, removeTodo } from "../todo/todo.js";

export function render() {
  const list = document.querySelector("#list");
  list.innerHTML = "";

  getTodos().forEach((todo) => {
    const li = document.createElement("li");
    li.textContent = todo.title;
    li.onclick = () => toggleTodo(todo.id);
    list.appendChild(li);
  });
}

export function setupUI() {
  document.querySelector("#add").onclick = () => {
    const input = document.querySelector("#input");
    if (input.value === "") {
    } else {
      addTodo(input.value);
    }
    render();
  };
}
