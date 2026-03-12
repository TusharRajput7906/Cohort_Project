import { useState, useEffect } from 'react';
import { contentAPI } from '../utils/api';
import ContentCard from '../components/ContentCard';
import { FiSearch, FiFilter, FiInbox } from 'react-icons/fi';
import { toast } from 'react-toastify';

const Home = () => {
  const [content, setContent] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    type: '',
    search: '',
    cluster: '',
  });
  const [stats, setStats] = useState({
    total: 0,
    articles: 0,
    tweets: 0,
    videos: 0,
    images: 0,
    pdfs: 0,
  });

  useEffect(() => {
    fetchContent();
  }, [filters]);

  const fetchContent = async () => {
    try {
      setLoading(true);
      const response = await contentAPI.getAll(filters);
      setContent(response.data.data);
      
      // Calculate stats
      const data = response.data.data;
      setStats({
        total: data.length,
        articles: data.filter(item => item.type === 'article').length,
        tweets: data.filter(item => item.type === 'tweet').length,
        videos: data.filter(item => item.type === 'youtube').length,
        images: data.filter(item => item.type === 'image').length,
        pdfs: data.filter(item => item.type === 'pdf').length,
      });
    } catch (error) {
      toast.error('Failed to fetch content');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div className="container">
      <div className="page-header">
        <h1 className="page-title">Your Saved Content</h1>
        <p className="page-subtitle">
          All your saved articles, tweets, videos, and more in one place
        </p>
      </div>

      {/* Stats */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-value">{stats.total}</div>
          <div className="stat-label">Total Items</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{stats.articles}</div>
          <div className="stat-label">Articles</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{stats.tweets}</div>
          <div className="stat-label">Tweets</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{stats.videos}</div>
          <div className="stat-label">Videos</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{stats.images}</div>
          <div className="stat-label">Images</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{stats.pdfs}</div>
          <div className="stat-label">PDFs</div>
        </div>
      </div>

      {/* Filters */}
      <div className="filter-bar">
        <div className="filter-row">
          <div className="filter-group">
            <label className="filter-label">
              <FiSearch /> Search
            </label>
            <input
              type="text"
              className="input"
              placeholder="Search content..."
              value={filters.search}
              onChange={(e) => handleFilterChange('search', e.target.value)}
            />
          </div>
          <div className="filter-group">
            <label className="filter-label">
              <FiFilter /> Type
            </label>
            <select
              className="input"
              value={filters.type}
              onChange={(e) => handleFilterChange('type', e.target.value)}
            >
              <option value="">All Types</option>
              <option value="article">Articles</option>
              <option value="tweet">Tweets</option>
              <option value="youtube">YouTube Videos</option>
              <option value="image">Images</option>
              <option value="pdf">PDFs</option>
            </select>
          </div>
        </div>
      </div>

      {/* Content Grid */}
      {loading ? (
        <div className="loading">
          <div className="spinner"></div>
        </div>
      ) : content.length > 0 ? (
        <div className="content-grid">
          {content.map((item) => (
            <ContentCard key={item._id} content={item} />
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <div className="empty-state-icon">
            <FiInbox size={64} />
          </div>
          <h2 className="empty-state-title">No content found</h2>
          <p className="empty-state-text">
            Start saving content from the internet to see it here
          </p>
          <button className="btn btn-primary" onClick={() => window.location.href = '/add'}>
            <FiSearch /> Add Your First Content
          </button>
        </div>
      )}
    </div>
  );
};

export default Home;
