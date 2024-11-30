import { baseUrl, request } from "../utils/constants";

function register(name, avatar, email, password) {
  return request(`${baseUrl}/signup`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name,
      avatar,
      email,
      password,
    }),
  });
}

function login(email, passsword) {
  return request(`${baseUrl}/signin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    ody: JSON.stringify({
      email,
      password,
    }),
  });
}

function checkToken(token) {
  return request(`${baseUrl}/users/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  });
}

export default auth;
