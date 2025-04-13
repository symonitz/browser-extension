import '../libs/browser-polyfill.min.js';
import { syncConfig } from "./sync.js";
import { matchRequest } from "./matcher.js";
import { logMatchEvent } from "./logger.js";
import { getStoredUrls } from "../shared/storage.js";
// import browser from "webextension-polyfill";



browser.runtime.onInstalled.addListener(() => {
  console.log("Extension installed");
  syncConfig();
});

// Optional periodic sync (e.g., every 2h)
browser.alarms.create("backgroundSync", { periodInMinutes: 120 });
// In case there another alerms - we would like to see its this trigger. 
browser.alarms.onAlarm.addListener((alarm) => {
  if (alarm.name === "backgroundSync") {
    syncConfig();
  }
});

// Listen for outbound HTTP requests
browser.webRequest.onBeforeRequest.addListener(
  async (details) => {
    const urls = await getStoredUrls();
    if (!urls || urls.length === 0) return;

    if (matchRequest(details.url, urls)) {
      console.log("Matched request:", details.url);
      logMatchEvent(details);
    }
  },
  //Todo: Change later. 
  { urls: ["<all_urls>"] }
);
