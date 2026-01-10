import { fakeFetch } from "../api/api.js";
import { getToken } from "../auth/auth.js";

const TODO_URL = "/todos";

export async function getTodos() {
  const res = await fakeFetch(TODO_URL, {
    headers: {
      Authorization: getToken(),
    },
  });

  return res.json();
}

export async function addTodo(user, pass) {
  const res = await fakeFetch(TODO_URL, {
    method: "POST",
    headers: {
      Authorization: getToken(),
    },
    body: JSON.stringify({
      id: Date.now(),
      user,
      pass,
      done: false,
    }),
  });

  return res.json();
}

export async function toggleTodo(id) {
  const todos = await getTodos();

  const updated = todos.map((t) => (t.id === id ? { ...t, done: !t.done } : t));

  await fakeFetch(TODO_URL, {
    method: "DELETE",
    headers: {
      Authorization: getToken(),
    },
  });

  for (const todo of updated) {
    await fakeFetch(TODO_URL, {
      method: "POST",
      headers: {
        Authorization: getToken(),
      },
      body: JSON.stringify(todo),
    });
  }

  return updated;
}

export async function removeTodo(id) {
  const todos = await getTodos();
  const filtered = todos.filter((t) => t.id !== id);

  await fakeFetch(TODO_URL, {
    method: "DELETE",
    headers: {
      Authorization: getToken(),
    },
  });

  for (const todo of filtered) {
    await fakeFetch(TODO_URL, {
      method: "POST",
      headers: {
        Authorization: getToken(),
      },
      body: JSON.stringify(todo),
    });
  }

  return filtered;
}
