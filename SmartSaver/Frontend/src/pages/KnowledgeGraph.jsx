import { useState, useEffect, useRef } from 'react';
import { contentAPI } from '../utils/api';
import { toast } from 'react-toastify';
import { Network } from 'vis-network/standalone';
import { FiZoomIn, FiZoomOut, FiMaximize2 } from 'react-icons/fi';

const KnowledgeGraph = () => {
  const [graphData, setGraphData] = useState(null);
  const [loading, setLoading] = useState(true);
  const networkRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    fetchGraphData();
  }, []);

  useEffect(() => {
    if (graphData && containerRef.current) {
      renderGraph();
    }
  }, [graphData]);

  const fetchGraphData = async () => {
    try {
      setLoading(true);
      const response = await contentAPI.getKnowledgeGraph();
      setGraphData(response.data.data);
    } catch (error) {
      toast.error('Failed to fetch knowledge graph');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const renderGraph = () => {
    if (!graphData || !containerRef.current) return;

    const colorMap = {
      article: '#3b82f6',
      tweet: '#1da1f2',
      youtube: '#ff0000',
      image: '#ec4899',
      pdf: '#ef4444',
    };

    const nodes = graphData.nodes.map(node => ({
      id: node.id,
      label: node.label.length > 30 ? node.label.substring(0, 30) + '...' : node.label,
      title: node.label,
      color: {
        background: colorMap[node.type] || '#6366f1',
        border: '#ffffff',
        highlight: {
          background: colorMap[node.type] || '#6366f1',
          border: '#ffffff',
        },
      },
      font: {
        color: '#ffffff',
        size: 14,
      },
      shape: 'dot',
      size: 20,
    }));

    const edges = graphData.edges.map(edge => ({
      from: edge.from,
      to: edge.to,
      color: {
        color: '#475569',
        highlight: '#6366f1',
      },
      width: 2,
      smooth: {
        type: 'continuous',
      },
    }));

    const data = { nodes, edges };

    const options = {
      nodes: {
        borderWidth: 2,
        shadow: {
          enabled: true,
          color: 'rgba(0,0,0,0.3)',
          size: 10,
        },
      },
      edges: {
        arrows: {
          to: {
            enabled: false,
          },
        },
      },
      physics: {
        enabled: true,
        barnesHut: {
          gravitationalConstant: -2000,
          centralGravity: 0.3,
          springLength: 95,
          springConstant: 0.04,
        },
        stabilization: {
          iterations: 150,
        },
      },
      interaction: {
        hover: true,
        tooltipDelay: 100,
        navigationButtons: true,
      },
    };

    const network = new Network(containerRef.current, data, options);

    network.on('click', (params) => {
      if (params.nodes.length > 0) {
        const nodeId = params.nodes[0];
        window.location.href = `/content/${nodeId}`;
      }
    });

    networkRef.current = network;
  };

  const handleZoomIn = () => {
    if (networkRef.current) {
      const scale = networkRef.current.getScale();
      networkRef.current.moveTo({ scale: scale * 1.2 });
    }
  };

  const handleZoomOut = () => {
    if (networkRef.current) {
      const scale = networkRef.current.getScale();
      networkRef.current.moveTo({ scale: scale * 0.8 });
    }
  };

  const handleFit = () => {
    if (networkRef.current) {
      networkRef.current.fit();
    }
  };

  return (
    <div className="container">
      <div className="page-header">
        <h1 className="page-title">Knowledge Graph</h1>
        <p className="page-subtitle">
          Visualize connections between your saved content
        </p>
      </div>

      {loading ? (
        <div className="loading">
          <div className="spinner"></div>
        </div>
      ) : graphData && graphData.nodes.length > 0 ? (
        <div className="card" style={{ padding: 0, position: 'relative', height: '70vh' }}>
          <div
            style={{
              position: 'absolute',
              top: '16px',
              right: '16px',
              display: 'flex',
              gap: '8px',
              zIndex: 10,
            }}
          >
            <button className="btn btn-secondary" onClick={handleZoomIn} title="Zoom In">
              <FiZoomIn />
            </button>
            <button className="btn btn-secondary" onClick={handleZoomOut} title="Zoom Out">
              <FiZoomOut />
            </button>
            <button className="btn btn-secondary" onClick={handleFit} title="Fit to Screen">
              <FiMaximize2 />
            </button>
          </div>
          <div
            ref={containerRef}
            style={{
              width: '100%',
              height: '100%',
              background: 'var(--background)',
              borderRadius: '12px',
            }}
          />
          <div
            style={{
              position: 'absolute',
              bottom: '16px',
              left: '16px',
              background: 'var(--surface)',
              padding: '12px 16px',
              borderRadius: '8px',
              border: '1px solid var(--border-color)',
              fontSize: '12px',
            }}
          >
            <div style={{ marginBottom: '8px', fontWeight: 600 }}>Legend:</div>
            <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#3b82f6' }} />
                <span>Article</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#1da1f2' }} />
                <span>Tweet</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#ff0000' }} />
                <span>YouTube</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#ec4899' }} />
                <span>Image</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#ef4444' }} />
                <span>PDF</span>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="empty-state">
          <h2 className="empty-state-title">No connections yet</h2>
          <p className="empty-state-text">
            Save more content to see connections in the knowledge graph
          </p>
        </div>
      )}

      {graphData && (
        <div style={{ marginTop: '24px' }}>
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-value">{graphData.nodes.length}</div>
              <div className="stat-label">Nodes</div>
            </div>
            <div className="stat-card">
              <div className="stat-value">{graphData.edges.length}</div>
              <div className="stat-label">Connections</div>
            </div>
            <div className="stat-card">
              <div className="stat-value">
                {graphData.edges.length > 0
                  ? ((graphData.edges.length / graphData.nodes.length) * 2).toFixed(1)
                  : 0}
              </div>
              <div className="stat-label">Avg Connections</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default KnowledgeGraph;
