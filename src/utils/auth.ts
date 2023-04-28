import { ZGDS_TOKEN_KEY } from "@/constants/auth";

export function setToken(token: string | (string | null)[]) {
  return localStorage.setItem(ZGDS_TOKEN_KEY, token.toString());
}

export function getToken() {
  return localStorage.getItem(ZGDS_TOKEN_KEY);
}

export function removeToken() {
  return localStorage.removeItem(ZGDS_TOKEN_KEY);
}
