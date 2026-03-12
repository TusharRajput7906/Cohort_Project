import Content from '../models/Content.js';
import natural from 'natural';

const TfIdf = natural.TfIdf;

// Semantic search using TF-IDF and text similarity
export const semanticSearch = async (query) => {
  try {
    if (!query || query.trim().length === 0) {
      return [];
    }

    // Get all content
    const allContent = await Content.find();
    
    if (allContent.length === 0) {
      return [];
    }

    // Initialize TF-IDF
    const tfidf = new TfIdf();

    // Add all documents
    allContent.forEach(content => {
      const document = `${content.title} ${content.description} ${content.content} ${content.tags.join(' ')} ${content.autoTags.join(' ')}`;
      tfidf.addDocument(document);
    });

    // Calculate similarity scores
    const scores = allContent.map((content, index) => {
      let score = 0;
      
      // TF-IDF based score
      tfidf.tfidfs(query, (i, measure) => {
        if (i === index) {
          score += measure * 100;
        }
      });

      // Exact match bonuses
      const searchTerms = query.toLowerCase().split(' ');
      const contentText = `${content.title} ${content.description} ${content.content}`.toLowerCase();
      
      searchTerms.forEach(term => {
        if (term.length > 2) {
          // Title match (highest priority)
          if (content.title.toLowerCase().includes(term)) {
            score += 50;
          }
          // Tag match
          if ([...content.tags, ...content.autoTags].some(tag => tag.toLowerCase().includes(term))) {
            score += 30;
          }
          // Description match
          if (content.description.toLowerCase().includes(term)) {
            score += 20;
          }
          // Content match
          if (contentText.includes(term)) {
            score += 10;
          }
        }
      });

      return {
        content,
        score
      };
    });

    // Sort by score and filter low scores
    const results = scores
      .filter(item => item.score > 0)
      .sort((a, b) => b.score - a.score)
      .map(item => item.content);

    return results;
  } catch (error) {
    console.error('Error in semantic search:', error);
    return [];
  }
};

// Search with explanation of why items match
export const semanticSearchWithExplanation = async (query) => {
  try {
    if (!query || query.trim().length === 0) {
      return [];
    }

    const allContent = await Content.find().populate('relatedContent');
    
    if (allContent.length === 0) {
      return [];
    }

    const searchTerms = query.toLowerCase().split(' ').filter(term => term.length > 2);
    
    const results = allContent.map(content => {
      let score = 0;
      const matches = [];

      const title = content.title.toLowerCase();
      const description = content.description.toLowerCase();
      const contentText = content.content.toLowerCase();
      const tags = [...content.tags, ...content.autoTags].map(t => t.toLowerCase());

      searchTerms.forEach(term => {
        if (title.includes(term)) {
          score += 50;
          matches.push(`Title contains "${term}"`);
        }
        if (tags.some(tag => tag.includes(term))) {
          score += 30;
          matches.push(`Tagged with "${term}"`);
        }
        if (description.includes(term)) {
          score += 20;
          matches.push(`Description mentions "${term}"`);
        }
        if (contentText.includes(term)) {
          score += 10;
          matches.push(`Content contains "${term}"`);
        }
      });

      return {
        content,
        score,
        matches: [...new Set(matches)]
      };
    });

    return results
      .filter(item => item.score > 0)
      .sort((a, b) => b.score - a.score);
  } catch (error) {
    console.error('Error in semantic search with explanation:', error);
    return [];
  }
};
