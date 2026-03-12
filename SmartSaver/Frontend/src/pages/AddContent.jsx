import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { contentAPI } from '../utils/api';
import { toast } from 'react-toastify';
import { FiSave, FiX, FiLink } from 'react-icons/fi';

const AddContent = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    type: 'article',
    url: '',
    title: '',
    description: '',
    content: '',
    thumbnail: '',
    tags: '',
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.url || !formData.title) {
      toast.error('URL and Title are required');
      return;
    }

    try {
      setLoading(true);
      const dataToSend = {
        ...formData,
        tags: formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag),
      };

      await contentAPI.create(dataToSend);
      toast.success('Content saved successfully! 🎉');
      navigate('/');
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Failed to save content';
      toast.error(errorMessage);
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    navigate('/');
  };

  return (
    <div className="container">
      <div className="page-header">
        <h1 className="page-title">Add New Content</h1>
        <p className="page-subtitle">
          Save content from anywhere on the internet
        </p>
      </div>

      <div className="add-content-form">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label required">Content Type</label>
            <select
              name="type"
              className="input"
              value={formData.type}
              onChange={handleChange}
              required
            >
              <option value="article">Article</option>
              <option value="tweet">Tweet</option>
              <option value="youtube">YouTube Video</option>
              <option value="image">Image</option>
              <option value="pdf">PDF</option>
            </select>
          </div>

          <div className="form-group">
            <label className="form-label required">
              <FiLink /> URL
            </label>
            <input
              type="url"
              name="url"
              className="input"
              placeholder="https://example.com/article"
              value={formData.url}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label required">Title</label>
            <input
              type="text"
              name="title"
              className="input"
              placeholder="Content title"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Description</label>
            <textarea
              name="description"
              className="input"
              placeholder="Brief description of the content"
              value={formData.description}
              onChange={handleChange}
              rows={3}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Content / Notes</label>
            <textarea
              name="content"
              className="input"
              placeholder="Main content or your notes about this item"
              value={formData.content}
              onChange={handleChange}
              rows={5}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Thumbnail URL</label>
            <input
              type="url"
              name="thumbnail"
              className="input"
              placeholder="https://example.com/image.jpg"
              value={formData.thumbnail}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Manual Tags (comma separated)</label>
            <input
              type="text"
              name="tags"
              className="input"
              placeholder="programming, javascript, react"
              value={formData.tags}
              onChange={handleChange}
            />
            <small style={{ color: 'var(--text-secondary)', fontSize: '12px' }}>
              Note: Tags will be automatically generated based on content
            </small>
          </div>

          <div className="form-actions">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={handleCancel}
              disabled={loading}
            >
              <FiX /> Cancel
            </button>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={loading}
            >
              <FiSave /> {loading ? 'Saving...' : 'Save Content'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddContent;
