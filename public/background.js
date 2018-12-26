/* global chrome */

chrome.runtime.onInstalled.addListener(() => {
  chrome.tabs.create({
    active: true,
  });
});
