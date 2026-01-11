import { fakeFetch } from "../api/api.js";
import { getToken } from "../auth/auth.js";

const TASK_URL = "/task";

export async function getTasks() {
  const res = await fakeFetch(TASK_URL, {
    headers: {
      Authorization: getToken(),
    },
  });

  return res.json();
}

export async function addTask(user, pass) {
  const res = await fakeFetch(TASK_URL, {
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

export async function toggleTask(id) {
  const todos = await getTodos();

  const updated = todos.map((t) => (t.id === id ? { ...t, done: !t.done } : t));

  await fakeFetch(TASK_URL, {
    method: "DELETE",
    headers: {
      Authorization: getToken(),
    },
  });

  for (const task of updated) {
    await fakeFetch(TASK_URL, {
      method: "POST",
      headers: {
        Authorization: getToken(),
      },
      body: JSON.stringify(task),
    });
  }

  return updated;
}

export async function removeTask(id) {
  const todos = await getTodos();
  const filtered = todos.filter((t) => t.id !== id);

  await fakeFetch(TASK_URL, {
    method: "DELETE",
    headers: {
      Authorization: getToken(),
    },
  });

  for (const todo of filtered) {
    await fakeFetch(TASK_URL, {
      method: "POST",
      headers: {
        Authorization: getToken(),
      },
      body: JSON.stringify(todo),
    });
  }

  return filtered;
}
