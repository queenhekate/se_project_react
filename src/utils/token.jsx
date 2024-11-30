const TOKEN_KEY = "jwt";

// setToken accepts the token as an argument, and adds it to
// with localStorage the key TOKEN_KEY.
export const setToken = (token) => localStorage.setItem(TOKEN_KEY, token);

// getToken retrieves and returns the value associated with
// TOKEN_KEY from localStorage.
export const getToken = () => {
  return localStorage.getItem(TOKEN_KEY);
};

export const removeToken = () => {
  localStorage.removeItem(TOKEN_KEY);
};
