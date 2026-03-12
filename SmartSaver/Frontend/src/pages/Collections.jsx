import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { collectionAPI } from '../utils/api';
import { toast } from 'react-toastify';
import { FiFolder, FiPlus, FiEdit2, FiTrash2, FiX } from 'react-icons/fi';

const Collections = () => {
  const navigate = useNavigate();
  const [collections, setCollections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    color: '#6366f1',
    icon: '📁'
  });

  const icons = ['📁', '📚', '💼', '🎨', '🔬', '💡', '🎯', '🚀', '⭐', '🔥', '📝', '🎓', '🏆', '🎪'];
  const colors = ['#6366f1', '#8b5cf6', '#ec4899', '#f59e0b', '#10b981', '#3b82f6', '#ef4444', '#14b8a6'];

  useEffect(() => {
    fetchCollections();
  }, []);

  const fetchCollections = async () => {
    try {
      setLoading(true);
      const response = await collectionAPI.getAll();
      setCollections(response.data.data);
    } catch (error) {
      toast.error('Failed to fetch collections');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    
    try {
      await collectionAPI.create(formData);
      toast.success('Collection created!');
      setShowModal(false);
      setFormData({ name: '', description: '', color: '#6366f1', icon: '📁' });
      fetchCollections();
    } catch (error) {
      toast.error('Failed to create collection');
      console.error(error);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this collection?')) return;
    
    try {
      await collectionAPI.delete(id);
      toast.success('Collection deleted');
      fetchCollections();
    } catch (error) {
      toast.error('Failed to delete collection');
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
            <h1 className="page-title">📁 Collections</h1>
            <p className="page-subtitle">Organize your content into custom collections</p>
          </div>
          <button className="btn btn-primary" onClick={() => setShowModal(true)}>
            <FiPlus /> New Collection
          </button>
        </div>
      </div>

      {collections.length > 0 ? (
        <div className="grid grid-3">
          {collections.map((collection) => (
            <div
              key={collection._id}
              className="card"
              onClick={() => navigate(`/collections/${collection._id}`)}
              style={{
                cursor: 'pointer',
                borderLeft: `4px solid ${collection.color}`,
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
                <div style={{ fontSize: '32px' }}>{collection.icon}</div>
                <button
                  className="btn btn-secondary"
                  style={{ padding: '6px 10px', background: 'var(--error)' }}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDelete(collection._id);
                  }}
                >
                  <FiTrash2 size={14} />
                </button>
              </div>
              <h3 style={{ fontSize: '18px', fontWeight: 600, marginBottom: '8px' }}>
                {collection.name}
              </h3>
              {collection.description && (
                <p style={{ color: 'var(--text-secondary)', fontSize: '14px', marginBottom: '12px' }}>
                  {collection.description}
                </p>
              )}
              <div style={{ 
                padding: '8px 12px', 
                background: `${collection.color}20`,
                color: collection.color,
                borderRadius: '8px',
                fontSize: '13px',
                fontWeight: 600,
                textAlign: 'center'
              }}>
                {collection.content?.length || 0} items
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <div className="empty-state-icon">
            <FiFolder size={64} />
          </div>
          <h2 className="empty-state-title">No collections yet</h2>
          <p className="empty-state-text">
            Create collections to organize your saved content
          </p>
          <button className="btn btn-primary" onClick={() => setShowModal(true)}>
            <FiPlus /> Create First Collection
          </button>
        </div>
      )}

      {/* Create Collection Modal */}
      {showModal && (
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
        }}>
          <div className="card" style={{ width: '90%', maxWidth: '500px', position: 'relative' }}>
            <button
              onClick={() => setShowModal(false)}
              style={{
                position: 'absolute',
                top: '16px',
                right: '16px',
                background: 'transparent',
                border: 'none',
                color: 'var(--text-secondary)',
                cursor: 'pointer',
                fontSize: '20px'
              }}
            >
              <FiX />
            </button>
            
            <h2 style={{ fontSize: '24px', marginBottom: '24px' }}>Create New Collection</h2>
            
            <form onSubmit={handleCreate}>
              <div className="form-group">
                <label className="form-label required">Name</label>
                <input
                  type="text"
                  className="input"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Description</label>
                <textarea
                  className="input"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={2}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Icon</label>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {icons.map(icon => (
                    <button
                      key={icon}
                      type="button"
                      onClick={() => setFormData({ ...formData, icon })}
                      style={{
                        padding: '8px',
                        fontSize: '24px',
                        background: formData.icon === icon ? 'var(--primary-color)' : 'var(--surface)',
                        border: '1px solid var(--border-color)',
                        borderRadius: '8px',
                        cursor: 'pointer'
                      }}
                    >
                      {icon}
                    </button>
                  ))}
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Color</label>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {colors.map(color => (
                    <button
                      key={color}
                      type="button"
                      onClick={() => setFormData({ ...formData, color })}
                      style={{
                        width: '40px',
                        height: '40px',
                        background: color,
                        border: formData.color === color ? '3px solid white' : '1px solid var(--border-color)',
                        borderRadius: '8px',
                        cursor: 'pointer'
                      }}
                    />
                  ))}
                </div>
              </div>

              <div className="form-actions">
                <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Create Collection
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Collections;
