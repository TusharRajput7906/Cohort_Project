import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { highlightAPI } from '../utils/api';
import { toast } from 'react-toastify';
import { formatDistanceToNow } from 'date-fns';
import { FiEdit3, FiTrash2, FiExternalLink } from 'react-icons/fi';

const Highlights = () => {
  const navigate = useNavigate();
  const [highlights, setHighlights] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchHighlights();
  }, []);

  const fetchHighlights = async () => {
    try {
      setLoading(true);
      const response = await highlightAPI.getAll();
      setHighlights(response.data.data);
    } catch (error) {
      toast.error('Failed to fetch highlights');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this highlight?')) return;
    
    try {
      await highlightAPI.delete(id);
      toast.success('Highlight deleted');
      fetchHighlights();
    } catch (error) {
      toast.error('Failed to delete highlight');
    }
  };

  const groupedHighlights = highlights.reduce((acc, highlight) => {
    const contentId = highlight.contentId?._id;
    if (!contentId) return acc;
    
    if (!acc[contentId]) {
      acc[contentId] = {
        content: highlight.contentId,
        highlights: []
      };
    }
    acc[contentId].highlights.push(highlight);
    return acc;
  }, {});

  if (loading) {
    return (
      <div className="container">
        <div className="loading">
          <div className="spinner"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="page-header">
        <h1 className="page-title">✨ Highlights</h1>
        <p className="page-subtitle">
          Important snippets and notes from your saved content
        </p>
      </div>

      {highlights.length > 0 ? (
        <>
          <div className="stats-grid" style={{ marginBottom: '30px' }}>
            <div className="stat-card">
              <div className="stat-value">{highlights.length}</div>
              <div className="stat-label">Total Highlights</div>
            </div>
            <div className="stat-card">
              <div className="stat-value">{Object.keys(groupedHighlights).length}</div>
              <div className="stat-label">Content Items</div>
            </div>
            <div className="stat-card">
              <div className="stat-value">
                {highlights.filter(h => h.note).length}
              </div>
              <div className="stat-label">With Notes</div>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {Object.values(groupedHighlights).map(({ content, highlights: contentHighlights }) => (
              <div key={content._id} className="card">
                <div style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'flex-start',
                  marginBottom: '20px',
                  paddingBottom: '16px',
                  borderBottom: '1px solid var(--border-color)'
                }}>
                  <div>
                    <span className={`badge badge-${content.type}`} style={{ marginBottom: '8px', display: 'inline-block' }}>
                      {content.type}
                    </span>
                    <h3 style={{ fontSize: '20px', fontWeight: 600, marginBottom: '4px' }}>
                      {content.title}
                    </h3>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '13px' }}>
                      {contentHighlights.length} {contentHighlights.length === 1 ? 'highlight' : 'highlights'}
                    </p>
                  </div>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button
                      className="btn btn-secondary"
                      onClick={() => navigate(`/content/${content._id}`)}
                    >
                      <FiExternalLink /> View
                    </button>
                  </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  {contentHighlights.map((highlight) => (
                    <div
                      key={highlight._id}
                      style={{
                        padding: '16px',
                        background: 'var(--background)',
                        borderRadius: '8px',
                        borderLeft: `4px solid ${highlight.color}`,
                        position: 'relative'
                      }}
                    >
                      <button
                        onClick={() => handleDelete(highlight._id)}
                        style={{
                          position: 'absolute',
                          top: '12px',
                          right: '12px',
                          background: 'var(--error)',
                          color: 'white',
                          border: 'none',
                          borderRadius: '6px',
                          padding: '6px 10px',
                          cursor: 'pointer',
                          fontSize: '13px',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '4px'
                        }}
                      >
                        <FiTrash2 size={12} /> Delete
                      </button>

                      <div style={{
                        background: `${highlight.color}30`,
                        padding: '12px 16px',
                        borderRadius: '6px',
                        marginBottom: '12px',
                        fontStyle: 'italic',
                        fontSize: '15px',
                        lineHeight: '1.6',
                        paddingRight: '80px'
                      }}>
                        "{highlight.text}"
                      </div>

                      {highlight.note && (
                        <div style={{ 
                          padding: '12px 16px',
                          background: 'var(--surface)',
                          borderRadius: '6px',
                          fontSize: '14px',
                          color: 'var(--text-secondary)',
                          marginBottom: '8px'
                        }}>
                          <strong style={{ color: 'var(--text-primary)' }}>Note:</strong> {highlight.note}
                        </div>
                      )}

                      <div style={{ 
                        fontSize: '12px',
                        color: 'var(--text-secondary)',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px'
                      }}>
                        <FiEdit3 size={12} />
                        <span>Highlighted {formatDistanceToNow(new Date(highlight.createdAt), { addSuffix: true })}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        <div className="empty-state">
          <div className="empty-state-icon">
            <FiEdit3 size={64} />
          </div>
          <h2 className="empty-state-title">No highlights yet</h2>
          <p className="empty-state-text">
            Highlights help you save important snippets from your content.
            Visit any saved content and create your first highlight!
          </p>
        </div>
      )}
    </div>
  );
};

export default Highlights;
