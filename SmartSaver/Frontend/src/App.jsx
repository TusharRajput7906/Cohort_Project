import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import AddContent from './pages/AddContent';
import ContentDetail from './pages/ContentDetail';
import KnowledgeGraph from './pages/KnowledgeGraph';
import Clusters from './pages/Clusters';
import Resurfaced from './pages/Resurfaced';
import Collections from './pages/Collections';
import CollectionDetail from './pages/CollectionDetail';
import Highlights from './pages/Highlights';
import SemanticSearch from './pages/SemanticSearch';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app">
        <Navbar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/add" element={<AddContent />} />
            <Route path="/content/:id" element={<ContentDetail />} />
            <Route path="/knowledge-graph" element={<KnowledgeGraph />} />
            <Route path="/clusters" element={<Clusters />} />
            <Route path="/resurfaced" element={<Resurfaced />} />
            <Route path="/collections" element={<Collections />} />
            <Route path="/collections/:id" element={<CollectionDetail />} />
            <Route path="/highlights" element={<Highlights />} />
            <Route path="/search" element={<SemanticSearch />} />
          </Routes>
        </main>
        <ToastContainer
          position="bottom-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
        />
      </div>
    </Router>
  );
}

export default App;
