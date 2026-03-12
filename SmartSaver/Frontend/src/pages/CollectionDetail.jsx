import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { collectionAPI, contentAPI } from '../utils/api';
import { toast } from 'react-toastify';
import ContentCard from '../components/ContentCard';
import { FiArrowLeft, FiPlus, FiX } from 'react-icons/fi';

const CollectionDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [collection, setCollection] = useState(null);
  const [allContent, setAllContent] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);

  useEffect(() => {
    fetchCollection();
    fetchAllContent();
  }, [id]);

  const fetchCollection = async () => {
    try {
      setLoading(true);
      const response = await collectionAPI.getById(id);
      setCollection(response.data.data);
    } catch (error) {
      toast.error('Failed to fetch collection');
      navigate('/collections');
    } finally {
      setLoading(false);
    }
  };

  const fetchAllContent = async () => {
    try {
      const response = await contentAPI.getAll({});
      setAllContent(response.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleAddContent = async (contentId) => {
    try {
      await collectionAPI.addContent(id, contentId);
      toast.success('Added to collection!');
      setShowAddModal(false);
      fetchCollection();
    } catch (error) {
      toast.error('Failed to add content');
    }
  };

  const handleRemoveContent = async (contentId) => {
    try {
      await collectionAPI.removeContent(id, contentId);
      toast.success('Removed from collection');
      fetchCollection();
    } catch (error) {
      toast.error('Failed to remove content');
    }
  };

  if (loading || !collection) {
    return (
      <div className="container">
        <div className="loading">
          <div className="spinner"></div>
        </div>
      </div>
    );
  }

  const availableContent = allContent.filter(
    content => !collection.content.find(c => c._id === content._id)
  );

  return (
    <div className="container">
      <button className="btn btn-secondary" onClick={() => navigate('/collections')}>
        <FiArrowLeft /> Back to Collections
      </button>

      <div style={{ marginTop: '24px' }}>
        <div className="card" style={{ marginBottom: '30px', borderLeft: `4px solid ${collection.color}` }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div style={{ display: 'flex', gap: '16px', alignItems: 'center', flex: 1 }}>
              <div style={{ fontSize: '48px' }}>{collection.icon}</div>
              <div style={{ flex: 1 }}>
                <h1 style={{ fontSize: '32px', marginBottom: '8px' }}>{collection.name}</h1>
                {collection.description && (
                  <p style={{ color: 'var(--text-secondary)', fontSize: '16px' }}>
                    {collection.description}
                  </p>
                )}
              </div>
            </div>
            <button className="btn btn-primary" onClick={() => setShowAddModal(true)}>
              <FiPlus /> Add Content
            </button>
          </div>

          <div style={{ 
            marginTop: '20px',
            padding: '12px 16px',
            background: `${collection.color}20`,
            color: collection.color,
            borderRadius: '8px',
            fontWeight: 600,
            fontSize: '14px'
          }}>
            {collection.content.length} {collection.content.length === 1 ? 'item' : 'items'} in this collection
          </div>
        </div>

        {collection.content.length > 0 ? (
          <div className="content-grid">
            {collection.content.map((content) => (
              <div key={content._id} style={{ position: 'relative' }}>
                <button
                  onClick={() => handleRemoveContent(content._id)}
                  style={{
                    position: 'absolute',
                    top: '10px',
                    right: '10px',
                    zIndex: 10,
                    background: 'var(--error)',
                    color: 'white',
                    border: 'none',
                    borderRadius: '50%',
                    width: '28px',
                    height: '28px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    fontSize: '14px'
                  }}
                >
                  <FiX />
                </button>
                <ContentCard content={content} />
              </div>
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <h2 className="empty-state-title">No content in this collection</h2>
            <p className="empty-state-text">Add content to organize it here</p>
            <button className="btn btn-primary" onClick={() => setShowAddModal(true)}>
              <FiPlus /> Add Content
            </button>
          </div>
        )}
      </div>

      {/* Add Content Modal */}
      {showAddModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0, 0, 0, 0.7)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000,
          padding: '20px'
        }}>
          <div className="card" style={{ width: '90%', maxWidth: '900px', maxHeight: '80vh', overflow: 'auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
              <h2 style={{ fontSize: '24px' }}>Add Content to Collection</h2>
              <button
                onClick={() => setShowAddModal(false)}
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: 'var(--text-secondary)',
                  cursor: 'pointer',
                  fontSize: '24px'
                }}
              >
                <FiX />
              </button>
            </div>

            {availableContent.length > 0 ? (
              <div className="grid grid-2">
                {availableContent.map(content => (
                  <div
                    key={content._id}
                    onClick={() => handleAddContent(content._id)}
                    style={{ cursor: 'pointer' }}
                  >
                    <ContentCard content={content} />
                  </div>
                ))}
              </div>
            ) : (
              <p style={{ textAlign: 'center', color: 'var(--text-secondary)' }}>
                All content is already in this collection
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default CollectionDetail;
