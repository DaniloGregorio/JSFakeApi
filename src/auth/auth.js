const loginData = [{ name: "Danilo", pass: "123" }];

const SESSION_KEY = loginData.filter(
  (value) => value.name === userInput.trim().toLowerCase()
);

export function Login({ name, pass }) {
  if (name.loginData !== name.userInput && pass.loginData !== pass.userInput) {
    return false;
  }
  localStorage.setItem(SESSION_KEY, "token");
  return true;
}

export function logout() {
  return localStorage.removeItem(SESSION_KEY);
}

export function getToken() {
  return localStorage.getItem(SESSION_KEY);
}

export function IsAuthenticated() {
  return !!getToken();
}
