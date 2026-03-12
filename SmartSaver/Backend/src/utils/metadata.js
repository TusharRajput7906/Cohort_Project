import axios from 'axios';

export const extractMetadata = async (url, type) => {
  const metadata = {
    author: '',
    publishedDate: null,
    source: '',
    fileSize: ''
  };

  try {
    // Extract domain as source
    const urlObj = new URL(url);
    metadata.source = urlObj.hostname.replace('www.', '');

    // Type-specific metadata extraction
    switch (type) {
      case 'youtube':
        metadata.source = 'YouTube';
        // Extract video ID from URL
        const videoId = extractYouTubeId(url);
        if (videoId) {
          metadata.videoId = videoId;
        }
        break;

      case 'twitter':
      case 'tweet':
        metadata.source = 'Twitter/X';
        break;

      case 'article':
        // Try to fetch Open Graph metadata
        try {
          const response = await axios.get(url, {
            timeout: 5000,
            headers: {
              'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
            }
          });

          const html = response.data;

          // Extract author
          const authorMatch = html.match(/<meta\s+(?:property|name)="(?:og:)?author"\s+content="([^"]+)"/i);
          if (authorMatch) {
            metadata.author = authorMatch[1];
          }

          // Extract publish date
          const dateMatch = html.match(/<meta\s+(?:property|name)="(?:article:published_time|og:published_time|datePublished)"\s+content="([^"]+)"/i);
          if (dateMatch) {
            metadata.publishedDate = new Date(dateMatch[1]);
          }
        } catch (error) {
          // Silently fail - metadata is optional
        }
        break;

      case 'pdf':
        metadata.source = 'PDF Document';
        break;

      case 'image':
        metadata.source = 'Image';
        break;
    }

  } catch (error) {
    console.error('Error extracting metadata:', error);
  }

  return metadata;
};

const extractYouTubeId = (url) => {
  const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
  const match = url.match(regExp);
  return (match && match[7].length === 11) ? match[7] : null;
};

export const extractUrlPreview = async (url) => {
  try {
    const response = await axios.get(url, {
      timeout: 5000,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      }
    });

    const html = response.data;

    const preview = {
      title: '',
      description: '',
      image: ''
    };

    // Extract title
    const titleMatch = html.match(/<meta\s+(?:property|name)="og:title"\s+content="([^"]+)"/i) ||
                      html.match(/<title>([^<]+)<\/title>/i);
    if (titleMatch) {
      preview.title = titleMatch[1];
    }

    // Extract description
    const descMatch = html.match(/<meta\s+(?:property|name)="(?:og:)?description"\s+content="([^"]+)"/i);
    if (descMatch) {
      preview.description = descMatch[1];
    }

    // Extract image
    const imageMatch = html.match(/<meta\s+(?:property|name)="og:image"\s+content="([^"]+)"/i);
    if (imageMatch) {
      preview.image = imageMatch[1];
    }

    return preview;
  } catch (error) {
    return { title: '', description: '', image: '' };
  }
};
