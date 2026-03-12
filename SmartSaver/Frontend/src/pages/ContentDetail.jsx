import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { contentAPI } from '../utils/api';
import { toast } from 'react-toastify';
import { formatDistanceToNow, format } from 'date-fns';
import ContentCard from '../components/ContentCard';
import {
  FiArrowLeft,
  FiExternalLink,
  FiTrash2,
  FiEdit,
  FiCalendar,
  FiEye,
  FiTag,
} from 'react-icons/fi';

const ContentDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchContent();
  }, [id]);

  const fetchContent = async () => {
    try {
      setLoading(true);
      const response = await contentAPI.getById(id);
      setContent(response.data.data);
    } catch (error) {
      toast.error('Failed to fetch content');
      navigate('/');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this content?')) {
      return;
    }

    try {
      await contentAPI.delete(id);
      toast.success('Content deleted successfully');
      navigate('/');
    } catch (error) {
      toast.error('Failed to delete content');
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

  if (!content) {
    return null;
  }

  return (
    <div className="container">
      <button className="btn btn-secondary" onClick={() => navigate('/')}>
        <FiArrowLeft /> Back
      </button>

      <div style={{ marginTop: '24px' }}>
        <div className="card" style={{ marginBottom: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '24px' }}>
            <div>
              <span className={`badge badge-${content.type}`} style={{ marginBottom: '12px', display: 'inline-block' }}>
                {content.type}
              </span>
              <h1 style={{ fontSize: '32px', marginBottom: '12px' }}>{content.title}</h1>
              {content.description && (
                <p style={{ color: 'var(--text-secondary)', fontSize: '16px', marginBottom: '16px' }}>
                  {content.description}
                </p>
              )}
            </div>
            <div style={{ display: 'flex', gap: '8px' }}>
              <button className="btn btn-secondary" onClick={() => window.open(content.url, '_blank')}>
                <FiExternalLink /> Open
              </button>
              <button className="btn btn-secondary" onClick={handleDelete} style={{ background: 'var(--error)' }}>
                <FiTrash2 />
              </button>
            </div>
          </div>

          {content.thumbnail && (
            <img
              src={content.thumbnail}
              alt={content.title}
              style={{
                width: '100%',
                maxHeight: '400px',
                objectFit: 'cover',
                borderRadius: '8px',
                marginBottom: '24px'
              }}
            />
          )}

          <div style={{ display: 'flex', gap: '24px', marginBottom: '24px', fontSize: '14px', color: 'var(--text-secondary)' }}>
            <span>
              <FiCalendar style={{ marginRight: '6px' }} />
              Saved {formatDistanceToNow(new Date(content.createdAt), { addSuffix: true })}
            </span>
            <span>
              <FiEye style={{ marginRight: '6px' }} />
              Last viewed {formatDistanceToNow(new Date(content.lastAccessedAt), { addSuffix: true })}
            </span>
            {content.cluster && (
              <span>
                📁 Cluster: <strong>{content.cluster}</strong>
              </span>
            )}
          </div>

          {content.content && (
            <div style={{ marginBottom: '24px' }}>
              <h3 style={{ fontSize: '18px', marginBottom: '12px' }}>Content</h3>
              <p style={{ color: 'var(--text-secondary)', whiteSpace: 'pre-wrap' }}>
                {content.content}
              </p>
            </div>
          )}

          {(content.tags?.length > 0 || content.autoTags?.length > 0) && (
            <div style={{ marginBottom: '16px' }}>
              <h3 style={{ fontSize: '16px', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <FiTag /> Tags
              </h3>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {content.tags.map((tag, index) => (
                  <span key={index} className="tag" style={{ background: 'rgba(99, 102, 241, 0.2)' }}>
                    {tag} (manual)
                  </span>
                ))}
                {content.autoTags.map((tag, index) => (
                  <span key={index} className="tag">
                    {tag} (auto)
                  </span>
                ))}
              </div>
            </div>
          )}

          {content.metadata && (
            <div style={{ marginTop: '24px', paddingTop: '24px', borderTop: '1px solid var(--border-color)' }}>
              <h3 style={{ fontSize: '16px', marginBottom: '12px' }}>Metadata</h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px', fontSize: '14px' }}>
                {content.metadata.source && (
                  <div>
                    <strong>Source:</strong> {content.metadata.source}
                  </div>
                )}
                {content.metadata.author && (
                  <div>
                    <strong>Author:</strong> {content.metadata.author}
                  </div>
                )}
                {content.metadata.publishedDate && (
                  <div>
                    <strong>Published:</strong> {format(new Date(content.metadata.publishedDate), 'MMM dd, yyyy')}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {content.relatedContent?.length > 0 && (
          <div>
            <h2 style={{ fontSize: '24px', marginBottom: '16px' }}>
              🔗 Related Content ({content.relatedContent.length})
            </h2>
            <div className="content-grid">
              {content.relatedContent.map((item) => (
                <ContentCard key={item._id} content={item} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ContentDetail;
