// shared/config.js

// 🌐 Where your extension gets its config and sends logs
export const serverUrl = "http://localhost:8000";

// 📥 GET: to fetch the list of URLs + version
export const get_url_endpoint = "/urls";

// 📤 POST: to send match logs
export const post_monitor_endpoint = "/log-requests";

// ⏱ Optional: polling interval (in minutes)
export const POLL_INTERVAL_MINUTES = 120;
