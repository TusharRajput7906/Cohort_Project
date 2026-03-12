import natural from 'natural';
import compromise from 'compromise';

const TfIdf = natural.TfIdf;
const tfidf = new TfIdf();

// Common stop words to filter out
const stopWords = new Set([
  'the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for',
  'of', 'with', 'by', 'from', 'as', 'is', 'was', 'are', 'were', 'been',
  'be', 'have', 'has', 'had', 'do', 'does', 'did', 'will', 'would', 'should',
  'could', 'may', 'might', 'must', 'can', 'this', 'that', 'these', 'those',
  'i', 'you', 'he', 'she', 'it', 'we', 'they', 'what', 'which', 'who',
  'when', 'where', 'why', 'how', 'all', 'each', 'every', 'both', 'few',
  'more', 'most', 'other', 'some', 'such', 'no', 'nor', 'not', 'only',
  'own', 'same', 'so', 'than', 'too', 'very', 'just', 'about'
]);

export const generateTags = (text) => {
  if (!text || text.trim().length === 0) {
    return [];
  }

  const tags = new Set();

  try {
    // Use compromise for NLP analysis
    const doc = compromise(text);

    // Extract important nouns
    const nouns = doc.nouns().out('array');
    nouns.forEach(noun => {
      const cleaned = noun.toLowerCase().trim();
      if (cleaned.length > 2 && !stopWords.has(cleaned)) {
        tags.add(cleaned);
      }
    });

    // Extract topics/subjects
    const topics = doc.topics().out('array');
    topics.forEach(topic => {
      const cleaned = topic.toLowerCase().trim();
      if (cleaned.length > 2 && !stopWords.has(cleaned)) {
        tags.add(cleaned);
      }
    });

    // Extract organizations, people, places
    const organizations = doc.organizations().out('array');
    const people = doc.people().out('array');
    const places = doc.places().out('array');

    [...organizations, ...people, ...places].forEach(entity => {
      const cleaned = entity.toLowerCase().trim();
      if (cleaned.length > 2) {
        tags.add(cleaned);
      }
    });

    // Use TF-IDF for keyword extraction
    tfidf.addDocument(text);
    const terms = [];
    tfidf.listTerms(0).forEach(item => {
      if (item.tfidf > 1.5 && item.term.length > 2 && !stopWords.has(item.term)) {
        terms.push(item.term);
      }
    });

    terms.slice(0, 5).forEach(term => tags.add(term));

  } catch (error) {
    console.error('Error generating tags:', error);
  }

  // Limit to top 10 tags
  return Array.from(tags).slice(0, 10);
};

export const extractTopics = (text) => {
  if (!text || text.trim().length === 0) {
    return [];
  }

  try {
    const doc = compromise(text);
    const topics = doc.topics().out('array');
    return topics.map(t => t.toLowerCase()).slice(0, 5);
  } catch (error) {
    console.error('Error extracting topics:', error);
    return [];
  }
};
