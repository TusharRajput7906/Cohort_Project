import { useState, useEffect } from 'react';
import { contentAPI } from '../utils/api';
import { toast } from 'react-toastify';
import ContentCard from '../components/ContentCard';
import { formatDistanceToNow } from 'date-fns';
import { FiClock, FiRefreshCw } from 'react-icons/fi';

const Resurfaced = () => {
  const [content, setContent] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchResurfaced();
  }, []);

  const fetchResurfaced = async () => {
    try {
      setLoading(true);
      const response = await contentAPI.getResurfaced();
      setContent(response.data.data);
    } catch (error) {
      toast.error('Failed to fetch resurfaced content');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

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
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h1 className="page-title">Resurfaced Content</h1>
            <p className="page-subtitle">
              Content from your past that might be relevant again
            </p>
          </div>
          <button className="btn btn-primary" onClick={fetchResurfaced}>
            <FiRefreshCw /> Refresh
          </button>
        </div>
      </div>

      {content.length > 0 ? (
        <>
          <div className="card" style={{ marginBottom: '30px', background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.1), transparent)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <FiClock size={24} color="var(--primary-color)" />
              <div>
                <h3 style={{ fontSize: '18px', fontWeight: 600, marginBottom: '4px' }}>
                  What is Resurfacing?
                </h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>
                  SmartSaver automatically brings back old content based on time patterns, related new content, 
                  and inactivity. Check here daily to rediscover forgotten gems!
                </p>
              </div>
            </div>
          </div>

          <div style={{ marginBottom: '24px' }}>
            <h2 style={{ fontSize: '20px', fontWeight: 600, marginBottom: '16px' }}>
              Recently Resurfaced ({content.length})
            </h2>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {content.map((item) => (
              <div key={item._id} className="card" style={{ background: 'var(--surface)' }}>
                <div style={{ marginBottom: '16px' }}>
                  {item.resurfaceReason && (
                    <div
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '8px',
                        padding: '6px 12px',
                        background: 'rgba(139, 92, 246, 0.2)',
                        color: 'var(--secondary-color)',
                        borderRadius: '20px',
                        fontSize: '13px',
                        fontWeight: 500,
                        marginBottom: '12px',
                      }}
                    >
                      <FiClock size={14} />
                      {item.resurfaceReason}
                    </div>
                  )}
                  {item.resurfacedAt && (
                    <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
                      Resurfaced {formatDistanceToNow(new Date(item.resurfacedAt), { addSuffix: true })}
                      {' • '}
                      Resurfaced {item.resurfaceCount} {item.resurfaceCount === 1 ? 'time' : 'times'}
                    </div>
                  )}
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '320px 1fr', gap: '20px' }}>
                  <div>
                    <ContentCard content={item} />
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                    <h3 style={{ fontSize: '16px', fontWeight: 600, marginBottom: '8px', color: 'var(--text-secondary)' }}>
                      Why was this resurfaced?
                    </h3>
                    <ul style={{ paddingLeft: '20px', color: 'var(--text-secondary)', fontSize: '14px', lineHeight: '1.8' }}>
                      <li>
                        Originally saved {formatDistanceToNow(new Date(item.createdAt), { addSuffix: true })}
                      </li>
                      {item.lastAccessedAt && (
                        <li>
                          Last viewed {formatDistanceToNow(new Date(item.lastAccessedAt), { addSuffix: true })}
                        </li>
                      )}
                      {item.relatedContent?.length > 0 && (
                        <li>
                          Has {item.relatedContent.length} related items
                        </li>
                      )}
                      {item.cluster && (
                        <li>
                          Part of the "{item.cluster}" cluster
                        </li>
                      )}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        <div className="empty-state">
          <div className="empty-state-icon">
            <FiClock size={64} />
          </div>
          <h2 className="empty-state-title">No resurfaced content yet</h2>
          <p className="empty-state-text">
            Content will automatically resurface based on time patterns and relevance.
            Check back tomorrow or save more content!
          </p>
        </div>
      )}
    </div>
  );
};

export default Resurfaced;
