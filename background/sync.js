
import { getStoredVersion, setStoredUrls, setStoredVersion } from "../shared/storage.js";
import { serverUrl, get_url_endpoint } from "../shared/config.js";

import { apiGet, apiPost } from "./api.js";
// Optional: hold rules in memory for faster matching
export let watchedPaths = [];

// Used by matcher.js to get current in-memory paths
export function getWatchedPaths() {
  return watchedPaths;
}

async function updateData(data){
    console.log(data.urls)
    console.log('data is ', data)
    await setStoredUrls(data.urls);
    await setStoredVersion(data.version);
    watchedPaths = data.urls;
    console.log("URLs updated, using version:", data.version);
}


export async function syncConfig() {

  try {
    const currentVersion = await getStoredVersion();
    const urlFetchStr = new URL(get_url_endpoint, serverUrl).toString();
    
    const data = await apiGet(urlFetchStr, {
        "X-Client-Version": currentVersion || "none"});
    
    // Check if the response is valid
      if (data.status === 204) {
        console.log("No changes in rule version.");
        return;
      }
    if (!Array.isArray(data.urls) || !data.version) {
    
      console.warn("Invalid config format from server, data:", data);
      return;
    }

      await updateData(data);
  
  } catch (err) {
    console.error("syncConfig error:", err);
  }
}
