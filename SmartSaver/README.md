# 🧠 SmartSaver - Intelligent Content Management System

SmartSaver is a full-stack web application that allows users to save content from the internet and automatically organizes, relates, and resurfaces it using intelligent algorithms.

## ✨ Features

### 📥 Save Multiple Content Types
- Articles
- Tweets  
- YouTube Videos
- Images
- PDF Documents

### 🤖 Automatic Intelligence
- **Auto-Tagging**: Automatically generates relevant tags using NLP
- **Topic Clustering**: Groups similar content together
- **Knowledge Graph**: Interactive visualization of connections between saved items
- **Related Content**: AI-powered suggestions of similar items you've saved
- **Memory Resurfacing**: Intelligently reminds you of old content at the right time

### 🔍 Semantic Search
- **Natural Language Search**: Find content by meaning, not just keywords
- **Context-Aware**: Understands search intent and context
- **Relevance Scoring**: Shows why each result matched your query
- **Smart Ranking**: Best matches appear first

### 📁 Collections
- **Custom Organization**: Create custom collections to group content
- **Visual Customization**: Choose icons and colors for each collection
- **Easy Management**: Add/remove content with simple clicks
- **Multiple Collections**: Organize content in multiple ways

### ✨ Highlight System
- **Save Important Snippets**: Highlight key parts of saved content
- **Add Notes**: Attach notes to your highlights
- **Color Coding**: Use different colors for different types of highlights
- **Quick Access**: View all highlights across all content

### 🌐 Browser Extension
- **One-Click Save**: Save any webpage instantly from your browser
- **Auto-Detection**: Automatically detects content type and fills metadata
- **Cross-Browser**: Works on Chrome, Edge, and Firefox
- **Usage Tracking**: See how much you've saved

## 🛠️ Tech Stack

### Backend
- **Node.js** + **Express.js** - REST API
- **MongoDB** - Database
- **Natural** - Natural Language Processing
- **Compromise** - Text analysis
- **Node-Cron** - Scheduled resurfacing

### Frontend
- **React** + **Vite** - UI Framework
- **React Router** - Navigation
- **Vis-Network** - Knowledge Graph Visualization
- **Axios** - API calls
- **React Toastify** - Notifications
- **React Icons** - Icon library

## 📁 Project Structure

```
SmartSaver/
├── Backend/
│   ├── src/
│   │   ├── config/        # Database configuration
│   │   ├── controllers/   # Route controllers
│   │   ├── models/        # MongoDB models
│   │   ├── routes/        # API routes
│   │   └── utils/         # Utility functions (tagging, clustering, etc.)
│   ├── server.js          # Express server
│   └── package.json
├── Frontend/
│   ├── src/
│   │   ├── components/    # React components
│   │   ├── pages/         # Page components
│   │   ├── utils/         # API utilities
│   │   ├── App.jsx        # Main app component
│   │   └── main.jsx       # Entry point
│   ├── index.html
│   └── package.json
└── README.md
```

## 🚀 Installation & Setup

### Prerequisites
- **Node.js** (v18 or higher)
- **MongoDB** (v6 or higher)

### 1. Clone the Repository
```bash
cd C:\Users\Hp\cohort_Project\SmartSaver
```

### 2. Setup Backend
```bash
cd Backend
npm install
```

Create a `.env` file in the Backend folder:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/smartsaver
NODE_ENV=development
```

Start MongoDB (if not already running):
```bash
# Windows
mongod

# Or if installed as service
net start MongoDB
```

Start the backend server:
```bash
npm run dev
```

### 3. Setup Frontend
Open a new terminal:
```bash
cd C:\Users\Hp\cohort_Project\SmartSaver\Frontend
npm install
npm run dev
```

### 4. Install Browser Extension (Optional)
1. Open Chrome/Edge and go to `chrome://extensions/`
2. Enable **Developer Mode**
3. Click **Load unpacked**
4. Select `C:\Users\Hp\cohort_Project\SmartSaver\BrowserExtension`
5. Extension is ready! See [BrowserExtension/README.md](BrowserExtension/README.md)


**Option 1: Using the Web App**
1. Click "Add" in the navigation
2. Select content type (Article, Tweet, YouTube, Image, or PDF)
3. Enter URL and details
4. Add custom tags (optional - AI will generate more)
5. Click "Save Content"

**Option 2: Using Browser Extension**
1. Navigate to any webpage
2. Click SmartSaver extension icon
3. Review auto-filled information
4. Click "Save to SmartSaver"

SmartSaver will automatically:
- Generate tags using NLP
- Assign to a cluster based on topics
- Find related content
- Enable for resurfacing

### Viewing & Managing Content
- **Home**: Browse all saved content with filters and stats
- **Search**: Use semantic search to find content by meaning
- **Collections**: Organize content into custom collections
- **Highlights**: View important snippets you've highlighted
- **Content Detail**: View full details, related items, and highlights
- **Knowledge Graph**: Interactive visualization of content connections
- **Clusters**: See automatically grouped content by topic
- **Resurfaced**: Rediscover old content brought back by AI
   - Find related content

### Viewing Content
- **Home**: Browse all saved content with filters
- **Content Detail**: View full details and related items
- **Knowledge Graph**: Visualize connections
- **Clusters**: See automatically grouped content
- **Resurfaced**: Rediscover old content

- `GET /api/content/search/semantic?query=` - Semantic search

### Analytics
- `GET /api/content/knowledge-graph` - Get graph data
- `GET /api/content/clusters` - Get all clusters
- `GET /api/content/resurfaced` - Get resurfaced content

### Collections
- `GET /api/collections` - Get all collections
- `GET /api/collections/:id` - Get single collection
- `POST /api/collections` - Create new collection
- `PUT /api/collections/:id` - Update collection
- `DELETE /api/collections/:id` - Delete collection
- `POST /api/collections/:id/add` - Add content to collection
- `DELETE /api/collections/:id/content/:contentId` - Remove from collection

### Highlights
- `GET /api/highlights` - Get all highlights
- `GET /api/highlights/content/:contentId` - Get highlights for content
- `POST /api/highlights` - Create new highlight
- `PUT /api/highlights/:id` - Update highlight
- `DELETE /api/highlights/:id` - Delete highligh content

## 🔍 API Endpoints

### Content
- `GET /api/content` - Get all content (with filters)
- `GET /api/content/:id` - Get single content
- `POST /api/content` - Create new content
- `PUT /api/content/:id` - Update content
- `DELETE /api/content/:id` - Delete content

### Analytics
- `GET /api/content/knowledge-graph` - Get graph data
- `GET /api/content/clusters` - Get all clusters
- `GET /api/content/resurfaced` - Get resurfaced content

## 🎨 Features in Detail

### Auto-Tagging
Uses **Natural** and **Compromise** libraries to:
- Extract nouns and topics
- Identify named entities (people, places, organizations)
- Calculate TF-IDF scores for keywords
- Filter stop words

### Clustering Algorithm
- Compares tags and topics between items
- Weights by content type and save time
- Groups similar content automatically
- Updates clusters dynamically

### Resurfacing Logic
Resurfaces content based on:
- Time patterns (1, 2, 3, 6 months ago)
- Inactivity (not viewed in 30+ days)
- Related new content
- Cluster activity

### Knowledge Graph
- Interactive visualization using Vis-Network
- Color-coded by content type
- Click nodes to view details
- Shows connection strength

## 🔧 Configuration

### Resurfacing Schedule
Edit in `Backend/src/utils/resurfacing.js`:
```javascript
// Default: Daily at 9 AM
cron.schedule('0 9 * * *', ...)

// Change to hourly:
cron.sCompleted Features ✅

- ✅ Browser extension for quick saves
- ✅ AI-powered tagging using NLP
- ✅ Semantic search
- ✅ Collections/Folders
- ✅ Highlight system
- ✅ Knowledge graph visualization
- ✅ Auto-clustering by topics
- ✅ Memory resurfacing
- ✅ Related content recommendations

## 🚀 Future Enhancements

- [ ] AI-powered content summarization
- [ ] Export/Import functionality
- [ ] Sharing and collaboration
- [ ] Mobile app (React Native)
- [ ] Offline mode with sync
- [ ] Full-text search OCR for PDFs
- [ ] Browser extension highlight sync
- [ ] Webhook integrations (Zapier, IFTTT)
- [ ] API key authentication
- [ ] Multi-user support with teams
## 🐛 Troubleshooting

### MongoDB Connection Error
```bash
# Make sure MongoDB is running
mongod

# Or check if service is running
net start MongoDB
```

### Port Already in Use
Change ports in:
- Backend: `.env` file
- Frontend: `vite.config.js`

### NLP Processing Slow
- Large content may take longer to process
- Reduce TF-IDF threshold in `tagging.js`
- Limit tag count

## 📝 Future Enhancements

- [ ] Browser extension for quick saves
- [ ] AI-powered content summarization
- [ ] Export/Import functionality
- [ ] Tags editing interface
- [ ] Advanced search with filters
- [ ] Collections/Folders
- [ ] Sharing and collaboration
- [ ] Mobile app

## 📜 License

This project is open source and available under the MIT License.

## 👨‍💻 Developer

Built with ❤️ using React, Node.js, and MongoDB

---

**Happy Saving! 🚀**
