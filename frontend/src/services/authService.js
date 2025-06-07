import apiClient from "./apiClient";

/**
 * loginWithProvider
 *  - For 'google' or 'facebook' login, redirect to backend OAuth endpoint.
 *  - Backend should respond with { token, user }.
 */
export async function loginWithProvider(provider) {
  // NOTE: In a real flow, you'd open a popup or redirect here.
  // For simplicity, assume backend returns token & user immediately.
  const res = await apiClient.get(`/auth/${provider}`);
  return res.data; // { token, user }
}

/**
 * loginMetaMask
 *  - MetaMask login: fetch nonce, ask user to sign, verify on backend.
 */
export async function loginMetaMask() {
  if (!window.ethereum) throw new Error("MetaMask not installed");
  await window.ethereum.request({ method: "eth_requestAccounts" });
  const accounts = await window.ethereum.request({ method: "eth_accounts" });
  const address = accounts[0];
  // Step 1: Get nonce
  const {
    data: { nonce },
  } = await apiClient.get(`/auth/metamask/nonce?address=${address}`);
  // Step 2: User signs nonce
  const signature = await window.ethereum.request({
    method: "personal_sign",
    params: [nonce, address],
  });
  // Step 3: Verify on backend, get JWT + user
  const { data } = await apiClient.post("/auth/metamask/verify", {
    address,
    signature,
  });
  return data; // { token, user }
}

/**
 * fetchUserProfile
 *  - Retrieves current user profile using the JWT in localStorage.
 */
export async function fetchUserProfile(token) {
  const res = await apiClient.get("/auth/me", {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data.user;
}

/**
 * logoutUser
 *  - Posts to /auth/logout (optional, just server‐side cleanup).
 */
export function logoutUser(token) {
  apiClient
    .post("/auth/logout", null, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .catch((err) => console.error("Logout error:", err));
}
