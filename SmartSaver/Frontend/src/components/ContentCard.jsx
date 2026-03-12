import { useNavigate } from 'react-router-dom';
import { formatDistanceToNow } from 'date-fns';
import { 
  FiFileText, 
  FiTwitter, 
  FiYoutube, 
  FiImage, 
  FiFile 
} from 'react-icons/fi';

const ContentCard = ({ content }) => {
  const navigate = useNavigate();

  const getTypeIcon = (type) => {
    switch (type) {
      case 'article': return <FiFileText />;
      case 'tweet': return <FiTwitter />;
      case 'youtube': return <FiYoutube />;
      case 'image': return <FiImage />;
      case 'pdf': return <FiFile />;
      default: return <FiFileText />;
    }
  };

  const handleClick = () => {
    navigate(`/content/${content._id}`);
  };

  return (
    <div className="content-card" onClick={handleClick}>
      <div className="content-card-thumbnail">
        {content.thumbnail ? (
          <img src={content.thumbnail} alt={content.title} />
        ) : (
          getTypeIcon(content.type)
        )}
      </div>
      <div className="content-card-body">
        <div className="content-card-header">
          <span className={`badge badge-${content.type}`}>{content.type}</span>
          {content.cluster && (
            <span className="tag" style={{ fontSize: '10px' }}>
              {content.cluster}
            </span>
          )}
        </div>
        <h3 className="content-card-title">{content.title}</h3>
        {content.description && (
          <p className="content-card-description">{content.description}</p>
        )}
        {(content.tags?.length > 0 || content.autoTags?.length > 0) && (
          <div className="content-card-tags">
            {[...content.tags, ...content.autoTags].slice(0, 4).map((tag, index) => (
              <span key={index} className="tag">{tag}</span>
            ))}
          </div>
        )}
        <div className="content-card-footer">
          <span>
            {formatDistanceToNow(new Date(content.createdAt), { addSuffix: true })}
          </span>
          {content.relatedContent?.length > 0 && (
            <span>🔗 {content.relatedContent.length} related</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ContentCard;
