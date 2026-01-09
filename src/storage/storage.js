export function load(key) {
  return JSON.parse(localStorage.getItem(key)) || [];
}

export function save(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}
