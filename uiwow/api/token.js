export function setToken(token) {
  localStorage.setItem("key", token);
}

export function getToken() {
  if (process.browser) return localStorage.getItem("key");
}

export function removeToken() {
  localStorage.removeItem("key");
}
