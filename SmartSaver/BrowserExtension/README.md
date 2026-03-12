# SmartSaver Browser Extension

Official browser extension for SmartSaver - Save and organize content from anywhere on the web!

## Features

- 🚀 **One-Click Save**: Save current page with a single click
- 🤖 **Auto-Detection**: Automatically detects content type (Article, Tweet, YouTube, Image, PDF)
- 📝 **Auto-Fill**: Pre-fills title, description from page metadata
- 🏷️ **Smart Tagging**: Add manual tags or let AI generate them automatically
- 📊 **Usage Stats**: Track how many items you've saved
- ⚡ **Fast & Lightweight**: Minimal performance impact

## Installation

### Chrome/Edge (Developer Mode)

1. Open Chrome/Edge and navigate to `chrome://extensions/` or `edge://extensions/`
2. Enable **Developer Mode** (toggle in top right)
3. Click **Load unpacked**
4. Select the `BrowserExtension` folder from your SmartSaver project
5. The extension is now installed!

### Firefox (Temporary Installation)

1. Open Firefox and navigate to `about:debugging#/runtime/this-firefox`
2. Click **Load Temporary Add-on**
3. Select the `manifest.json` file from the `BrowserExtension` folder
4. The extension is now installed!

## Configuration

### Set API URL (if backend is not on localhost:5000)

1. Right-click the SmartSaver extension icon
2. Click **Options** (or open extension settings)
3. Enter your backend API URL (e.g., `http://your-server:5000/api`)
4. Save settings

Alternatively, the extension uses `http://localhost:5000/api` by default.

## Usage

### Save Current Page
1. Navigate to any webpage you want to save
2. Click the SmartSaver extension icon
3. Review/edit the auto-filled information
4. Add custom tags if desired
5. Click **Save to SmartSaver**

### Keyboard Shortcut (Optional)
- Press `Ctrl+Shift+S` (Windows/Linux) or `Cmd+Shift+S` (Mac) to open the save popup

### Right-Click Menu
- Right-click on any page and select **Save to SmartSaver**

## Auto-Detection

The extension automatically detects:
- **YouTube Videos**: URLs from youtube.com or youtu.be
- **Tweets**: URLs from twitter.com or x.com
- **Images**: Direct image URLs (.jpg, .png, .gif, .webp)
- **PDFs**: Direct PDF URLs (.pdf)
- **Articles**: Everything else defaults to article type

## Features Coming Soon

- ✨ Text selection quick-save
- 🎨 Inline highlighting with sync
- 📌 Floating save button on pages
- 🔄 Sync highlights across devices
- 📱 Mobile extension support

## Troubleshooting

### Extension not saving content
- Make sure SmartSaver backend is running (`npm run dev` in Backend folder)
- Check that backend is accessible at `http://localhost:5000/api`
- Verify no CORS errors in browser console

### Auto-fill not working
- Some websites block extension scripts - you may need to manually fill fields
- Refresh the page and try again

### Stats not updating
- Make sure you're allowing the extension to store data locally
- Check browser storage permissions

## Development

To modify the extension:

1. Make changes to files in `BrowserExtension` folder
2. Go to `chrome://extensions/`
3. Click the **Reload** button under SmartSaver
4. Test your changes

## Files Structure

```
BrowserExtension/
├── manifest.json       # Extension configuration
├── popup.html          # Popup UI
├── popup.js            # Popup logic
├── background.js       # Background service worker
├── content.js          # Content script (runs on pages)
├── content.css         # Content script styles
├── icon16.png          # Extension icons
├── icon48.png
└── icon128.png
```

## Privacy

- The extension only sends data to YOUR SmartSaver backend
- No data is shared with third parties
- All content stays on your server/localhost
- Extension only accesses page metadata when you click save

## Support

For issues or questions, visit the main SmartSaver repository.

---

**Built with ❤️ for SmartSaver**
