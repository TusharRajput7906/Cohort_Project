import { useState, useEffect } from 'react';
import { contentAPI } from '../utils/api';
import { toast } from 'react-toastify';
import ContentCard from '../components/ContentCard';
import { FiSearch, FiInfo } from 'react-icons/fi';

const SemanticSearch = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    
    if (!query.trim()) {
      toast.error('Please enter a search query');
      return;
    }

    try {
      setLoading(true);
      setSearched(true);
      const response = await contentAPI.semanticSearch(query);
      setResults(response.data.data);
    } catch (error) {
      toast.error('Search failed');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <div className="page-header">
        <h1 className="page-title">🔍 Semantic Search</h1>
        <p className="page-subtitle">
          Find content using natural language - search by meaning, not just keywords
        </p>
      </div>

      <div className="card" style={{ marginBottom: '30px' }}>
        <form onSubmit={handleSearch}>
          <div style={{ display: 'flex', gap: '12px', marginBottom: '16px' }}>
            <input
              type="text"
              className="input"
              placeholder="What are you looking for? (e.g., 'machine learning tutorials', 'climate change articles')"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              style={{ flex: 1 }}
            />
            <button type="submit" className="btn btn-primary" disabled={loading}>
              <FiSearch /> {loading ? 'Searching...' : 'Search'}
            </button>
          </div>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-secondary)', fontSize: '13px' }}>
            <FiInfo size={16} />
            <span>Try: "javascript tutorials", "design inspiration", "productivity tips", etc.</span>
          </div>
        </form>
      </div>

      {loading ? (
        <div className="loading">
          <div className="spinner"></div>
        </div>
      ) : searched ? (
        results.length > 0 ? (
          <>
            <div style={{ marginBottom: '20px' }}>
              <h2 style={{ fontSize: '20px', fontWeight: 600 }}>
                Found {results.length} {results.length === 1 ? 'result' : 'results'} for "{query}"
              </h2>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {results.map((result, index) => (
                <div key={result.content._id} style={{ position: 'relative' }}>
                  <div style={{ 
                    position: 'absolute', 
                    top: '-10px', 
                    left: '-10px', 
                    background: 'var(--primary-color)',
                    color: 'white',
                    borderRadius: '50%',
                    width: '28px',
                    height: '28px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 'bold',
                    fontSize: '14px',
                    zIndex: 1
                  }}>
                    {index + 1}
                  </div>
                  <div className="card" style={{ paddingLeft: '30px' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: '320px 1fr', gap: '20px' }}>
                      <ContentCard content={result.content} />
                      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                        <h3 style={{ fontSize: '14px', fontWeight: 600, marginBottom: '8px', color: 'var(--text-secondary)' }}>
                          Why this matched:
                        </h3>
                        <ul style={{ paddingLeft: '20px', color: 'var(--text-secondary)', fontSize: '13px', lineHeight: '1.8' }}>
                          {result.matches.map((match, i) => (
                            <li key={i}>{match}</li>
                          ))}
                        </ul>
                        <div style={{ marginTop: '12px', fontSize: '12px', color: 'var(--text-secondary)' }}>
                          <strong>Relevance Score:</strong> {result.score}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className="empty-state">
            <h2 className="empty-state-title">No results found</h2>
            <p className="empty-state-text">
              Try different search terms or save more content
            </p>
          </div>
        )
      ) : (
        <div className="empty-state">
          <div className="empty-state-icon">
            <FiSearch size={64} />
          </div>
          <h2 className="empty-state-title">Semantic Search</h2>
          <p className="empty-state-text">
            Enter a query above to search your saved content by meaning, not just keywords.
            Our semantic search understands context and finds relevant content even if exact words don't match.
          </p>
        </div>
      )}
    </div>
  );
};

export default SemanticSearch;
