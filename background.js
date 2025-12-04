// ← change this

chrome.action.onClicked.addListener(async (tab) => {
  const originalUrl = tab.url;   // save current page
  const targetUrl = "https://freedium-mirror.cfd/"; 
  // Try redirect
  chrome.tabs.update(tab.id, { url: targetUrl+originalUrl });

  // Listen for navigation errors
  const listener = (details) => {
    if (details.tabId === tab.id) {
      // If the error happened while trying to reach targetUrl:
      if (details.url === targetUrl) {
        // Go back to original page
        chrome.tabs.update(tab.id, { url: originalUrl });
      }

      // Remove listener after use
      chrome.webNavigation.onErrorOccurred.removeListener(listener);
    }
  };

  chrome.webNavigation.onErrorOccurred.addListener(listener);
});
