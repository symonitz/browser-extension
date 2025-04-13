import { serverUrl } from "../shared/config.js";


export async function apiGet(endpoint, headers = {}) {
  const url = endpoint;
  // const url = endpoint.startsWith("http")
  //   ? endpoint
  //   : `${serverUrl}${endpoint}`;

  const res = await fetch(url, {
    method: "GET",
    headers,
  });

 
  if (!res.ok && res.status !== 204) {
    throw new Error(`GET ${url} failed: ${res.status}`);
  }

  return await res.json();
}


export async function apiPost(endpoint, body, headers = {}) {
  const url = endpoint.startsWith("http")
    ? endpoint
    : `${serverUrl}${endpoint}`;

  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    throw new Error(`POST ${url} failed: ${res.status}`);
  }

  return await res.json();
}
