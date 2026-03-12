// Get current tab information
chrome.tabs.query({ active: true, currentWindow: true }, async (tabs) => {
  const currentTab = tabs[0];
  
  // Auto-fill URL and title
  document.getElementById('url').value = currentTab.url;
  document.getElementById('title').value = currentTab.title || '';
  
  // Auto-detect content type
  const url = currentTab.url.toLowerCase();
  let type = 'article';
  
  if (url.includes('youtube.com') || url.includes('youtu.be')) {
    type = 'youtube';
  } else if (url.includes('twitter.com') || url.includes('x.com')) {
    type = 'tweet';
  } else if (url.match(/\.(jpg|jpeg|png|gif|webp)$/)) {
    type = 'image';
  } else if (url.endsWith('.pdf')) {
    type = 'pdf';
  }
  
  document.getElementById('type').value = type;
  
  // Try to get page description
  chrome.scripting.executeScript({
    target: { tabId: currentTab.id },
    func: () => {
      const metaDesc = document.querySelector('meta[name="description"]');
      const ogDesc = document.querySelector('meta[property="og:description"]');
      const firstP = document.querySelector('p');
      
      return metaDesc?.content || ogDesc?.content || firstP?.textContent?.substring(0, 200) || '';
    }
  }, (results) => {
    if (results && results[0] && results[0].result) {
      document.getElementById('description').value = results[0].result;
    }
  });
  
  // Get thumbnail/image
  chrome.scripting.executeScript({
    target: { tabId: currentTab.id },
    func: () => {
      const ogImage = document.querySelector('meta[property="og:image"]');
      return ogImage?.content || '';
    }
  }, (results) => {
    if (results && results[0]) {
      window.pageImage = results[0].result;
    }
  });
});

// Load stats
chrome.storage.local.get(['totalSaved', 'savedToday', 'lastSaveDate'], (result) => {
  const today = new Date().toDateString();
  const lastSaveDate = result.lastSaveDate || '';
  
  let totalSaved = result.totalSaved || 0;
  let savedToday = (lastSaveDate === today) ? (result.savedToday || 0) : 0;
  
  document.getElementById('totalSaved').textContent = totalSaved;
  document.getElementById('savedToday').textContent = savedToday;
  document.getElementById('stats').style.display = 'block';
});

// Handle form submission
document.getElementById('saveForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  
  const saveBtn = document.getElementById('saveBtn');
  const statusDiv = document.getElementById('status');
  
  saveBtn.disabled = true;
  saveBtn.textContent = '⏳ Saving...';
  
  const formData = {
    type: document.getElementById('type').value,
    url: document.getElementById('url').value,
    title: document.getElementById('title').value,
    description: document.getElementById('description').value,
    thumbnail: window.pageImage || '',
    tags: document.getElementById('tags').value.split(',').map(t => t.trim()).filter(t => t),
  };
  
  try {
    // Get API URL from storage
    const { apiUrl } = await chrome.storage.sync.get(['apiUrl']);
    const API_URL = apiUrl || 'http://localhost:5000/api';
    
    const response = await fetch(`${API_URL}/content`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });
    
    if (!response.ok) {
      throw new Error('Failed to save content');
    }
    
    // Update stats
    chrome.storage.local.get(['totalSaved', 'savedToday', 'lastSaveDate'], (result) => {
      const today = new Date().toDateString();
      const lastSaveDate = result.lastSaveDate || '';
      
      let totalSaved = (result.totalSaved || 0) + 1;
      let savedToday = (lastSaveDate === today) ? (result.savedToday || 0) + 1 : 1;
      
      chrome.storage.local.set({
        totalSaved,
        savedToday,
        lastSaveDate: today
      });
      
      document.getElementById('totalSaved').textContent = totalSaved;
      document.getElementById('savedToday').textContent = savedToday;
    });
    
    statusDiv.className = 'status success';
    statusDiv.textContent = '✅ Saved successfully! Auto-tagging and clustering in progress...';
    statusDiv.style.display = 'block';
    
    saveBtn.textContent = '✅ Saved!';
    
    setTimeout(() => {
      window.close();
    }, 1500);
    
  } catch (error) {
    console.error('Error saving content:', error);
    
    statusDiv.className = 'status error';
    statusDiv.textContent = `❌ Error: ${error.message}. Check if SmartSaver backend is running.`;
    statusDiv.style.display = 'block';
    
    saveBtn.disabled = false;
    saveBtn.textContent = '💾 Save to SmartSaver';
  }
});
