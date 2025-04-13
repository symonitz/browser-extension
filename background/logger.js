import '../libs/browser-polyfill.min.js';
import { serverUrl } from "../shared/config.js";
import { apiPost } from "./api.js";
// import browser from "webextension-polyfill";

const LOG_URL = `${serverUrl}/log-requests`;



/**
 * Sends match event to server and notifies the user
 * @param {object} requestDetails - From chrome.webRequest
 */

export async function logMatchEvent(requestDetails) {
  const payload = {
    url: requestDetails.url,
    
  };

  try {
    const result = await apiPost(LOG_URL, payload);

    console.log("Match logged:", result);

    if (result.trigger) {
      showTriggerNotification(payload.url);
    }
  } catch (err) {
    console.error(" Failed to log match:", err);
  }
}

/**
 * Shows a native notification in the browser
 * @param {string} url - The matched URL to show
 */
function showTriggerNotification(url) {
  browser.notifications.create({
    type: "basic",
    iconUrl: "../shared/alert.png", 
    title: "Alert!",
    message: `Rule matched for: ${url}`,
    priority:2
  });
}
