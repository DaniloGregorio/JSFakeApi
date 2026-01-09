const SESSION_KEY = "session";
//create the token based in login/pass
export function login(user, pass) {
  //no validation of user(mocked data)
  if (user === "admin" && pass === "123") {
    localStorage.setItem(SESSION_KEY, "token");
    return true;
  }
  return false;
}

export function logout() {
  return localStorage.removeItem(SESSION_KEY);
}

export function getToken() {
  return localStorage.getItem(SESSION_KEY);
}
export function isAuthenticated() {
  return !!getToken();
}
