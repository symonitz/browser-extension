// import browser from "webextension-polyfill";
import '../libs/browser-polyfill.min.js';

const runtime = typeof browser !== "undefined" ? browser : chrome;

/**
 * Get a value from chrome.storage.local
 * @param {string} key - The storage key to retrieve
 * @returns {Promise<any>} - The value stored at the given key
 */
export async function get(key) {
    const result = await runtime.storage.local.get(key);
    return result[key];
    // return new Promise((resolve) => {
    //   browser.storage.local.get(key, (result) => {
    //     resolve(result[key]);
    //   });
    // });
  }
  
  /**
   * Set a value in chrome.storage.local
   * @param {string} key - The storage key
   * @param {any} value - The value to store
   * @returns {Promise<void>}
   */
  export async function set(key, value) {
    return  runtime.storage.local.set({ [key]: value });
   
  }
  
  /**
   * Remove a key from chrome.storage.local
   * @param {string} key
   * @returns {Promise<void>}
   */
  export async function remove(key) {
    return runtime.storage.local.remove(key);

  }
  

  export async function getStoredUrls() {
    return (await get("savedUrls")) || [];
  
  }

  export async function setStoredUrls(version) {
    return (await set("savedUrls", version)) || [];
  }

  export async function getStoredVersion() {
    return (await get("ruleVersion")) || null;
  }
  export function setStoredVersion(version) {
    return set("ruleVersion", version);
  }
  

  
  