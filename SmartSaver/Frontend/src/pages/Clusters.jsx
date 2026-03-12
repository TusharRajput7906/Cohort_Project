import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { contentAPI } from '../utils/api';
import { toast } from 'react-toastify';
import { FiLayers, FiChevronDown, FiChevronUp } from 'react-icons/fi';

const Clusters = () => {
  const navigate = useNavigate();
  const [clusters, setClusters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedClusters, setExpandedClusters] = useState(new Set());

  useEffect(() => {
    fetchClusters();
  }, []);

  const fetchClusters = async () => {
    try {
      setLoading(true);
      const response = await contentAPI.getClusters();
      setClusters(response.data.data);
    } catch (error) {
      toast.error('Failed to fetch clusters');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const toggleCluster = (clusterId) => {
    const newExpanded = new Set(expandedClusters);
    if (newExpanded.has(clusterId)) {
      newExpanded.delete(clusterId);
    } else {
      newExpanded.add(clusterId);
    }
    setExpandedClusters(newExpanded);
  };

  const getClusterColor = (index) => {
    const colors = [
      '#6366f1', '#8b5cf6', '#ec4899', '#f59e0b',
      '#10b981', '#3b82f6', '#ef4444', '#14b8a6',
    ];
    return colors[index % colors.length];
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
        <h1 className="page-title">Content Clusters</h1>
        <p className="page-subtitle">
          Automatically grouped content based on topics and similarity
        </p>
      </div>

      {clusters.length > 0 ? (
        <>
          <div className="stats-grid" style={{ marginBottom: '30px' }}>
            <div className="stat-card">
              <div className="stat-value">{clusters.length}</div>
              <div className="stat-label">Total Clusters</div>
            </div>
            <div className="stat-card">
              <div className="stat-value">
                {Math.max(...clusters.map(c => c.count))}
              </div>
              <div className="stat-label">Largest Cluster</div>
            </div>
            <div className="stat-card">
              <div className="stat-value">
                {(clusters.reduce((sum, c) => sum + c.count, 0) / clusters.length).toFixed(1)}
              </div>
              <div className="stat-label">Avg Items/Cluster</div>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {clusters.map((cluster, index) => (
              <div key={cluster._id} className="card" style={{ padding: 0, overflow: 'hidden' }}>
                <div
                  onClick={() => toggleCluster(cluster._id)}
                  style={{
                    padding: '20px',
                    cursor: 'pointer',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    background: `linear-gradient(135deg, ${getClusterColor(index)}15, transparent)`,
                    borderLeft: `4px solid ${getClusterColor(index)}`,
                  }}
                >
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                      <FiLayers color={getClusterColor(index)} size={24} />
                      <h3 style={{ fontSize: '20px', fontWeight: 600, textTransform: 'capitalize' }}>
                        {cluster._id}
                      </h3>
                      <span className="badge" style={{ background: getClusterColor(index) }}>
                        {cluster.count} items
                      </span>
                    </div>
                    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                      {cluster.types?.map((type, i) => (
                        <span key={i} className={`badge badge-${type}`}>
                          {type}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    {expandedClusters.has(cluster._id) ? (
                      <FiChevronUp size={24} />
                    ) : (
                      <FiChevronDown size={24} />
                    )}
                  </div>
                </div>

                {expandedClusters.has(cluster._id) && (
                  <div style={{ padding: '20px', borderTop: '1px solid var(--border-color)' }}>
                    <h4 style={{ fontSize: '14px', fontWeight: 600, marginBottom: '12px', color: 'var(--text-secondary)' }}>
                      Content in this cluster:
                    </h4>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      {cluster.items.map((item) => (
                        <div
                          key={item._id}
                          onClick={() => navigate(`/content/${item._id}`)}
                          style={{
                            padding: '12px 16px',
                            background: 'var(--background)',
                            borderRadius: '8px',
                            cursor: 'pointer',
                            transition: 'all 0.3s ease',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '12px',
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.background = 'var(--surface-hover)';
                            e.currentTarget.style.transform = 'translateX(4px)';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.background = 'var(--background)';
                            e.currentTarget.style.transform = 'translateX(0)';
                          }}
                        >
                          <span className={`badge badge-${item.type}`}>{item.type}</span>
                          <span style={{ flex: 1 }}>{item.title}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </>
      ) : (
        <div className="empty-state">
          <h2 className="empty-state-title">No clusters yet</h2>
          <p className="empty-state-text">
            Save more content to see automatic clustering
          </p>
        </div>
      )}
    </div>
  );
};

export default Clusters;
