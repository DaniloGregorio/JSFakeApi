import { load, save } from "../storage/storage.js";

const KEY = "todos";

export function getTodos() {
  return load(KEY);
}

export function addTodo(title) {
  const todos = load(KEY);
  todos.push({ id: Date.now(), title, done: false });
  save(KEY, todos);
}

export function toggleTodo(id) {
  const todos = load(KEY).map((t) =>
    t.id === id ? { ...t, done: !t.done } : t
  );
  save(KEY, todos);
}

export function removeTodo(id) {
  const todos = load(KEY).filter((t) => t.id !== id);
  save(KEY, todos);
}
