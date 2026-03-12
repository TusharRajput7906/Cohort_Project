// Background service worker for SmartSaver extension

chrome.runtime.onInstalled.addListener(() => {
  console.log('SmartSaver extension installed');
  
  // Set default API URL
  chrome.storage.sync.get(['apiUrl'], (result) => {
    if (!result.apiUrl) {
      chrome.storage.sync.set({ apiUrl: 'http://localhost:5000/api' });
    }
  });
  
  // Initialize stats
  chrome.storage.local.get(['totalSaved'], (result) => {
    if (result.totalSaved === undefined) {
      chrome.storage.local.set({ totalSaved: 0, savedToday: 0 });
    }
  });
});

// Context menu for quick save
chrome.contextMenus.create({
  id: 'smartsaver-save',
  title: 'Save to SmartSaver',
  contexts: ['page', 'link', 'selection', 'image']
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === 'smartsaver-save') {
    // Open popup
    chrome.action.openPopup();
  }
});

// Listen for keyboard shortcuts
chrome.commands.onCommand.addListener((command) => {
  if (command === 'save-page') {
    chrome.action.openPopup();
  }
});
