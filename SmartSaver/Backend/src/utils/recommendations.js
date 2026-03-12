import Content from '../models/Content.js';

// Calculate similarity score between two content items
const calculateSimilarity = (content1, content2) => {
  let score = 0;

  // Same cluster
  if (content1.cluster === content2.cluster && content1.cluster) {
    score += 5;
  }

  // Common tags
  const tags1 = [...content1.tags, ...content1.autoTags];
  const tags2 = [...content2.tags, ...content2.autoTags];
  const commonTags = tags1.filter(tag => tags2.includes(tag));
  score += commonTags.length * 3;

  // Common topics
  const topics1 = content1.topics || [];
  const topics2 = content2.topics || [];
  const commonTopics = topics1.filter(topic => topics2.includes(topic));
  score += commonTopics.length * 4;

  // Same type
  if (content1.type === content2.type) {
    score += 2;
  }

  // Similar save time (within 7 days)
  const daysDiff = Math.abs(
    (new Date(content1.createdAt) - new Date(content2.createdAt)) / (1000 * 60 * 60 * 24)
  );
  if (daysDiff <= 7) {
    score += 3;
  }

  return score;
};

export const findRelatedContent = async (contentId) => {
  try {
    const content = await Content.findById(contentId);
    if (!content) return;

    const allContent = await Content.find({ _id: { $ne: contentId } });

    const similarities = allContent.map(item => ({
      id: item._id,
      score: calculateSimilarity(content, item)
    }));

    // Sort by score and get top 5 related items
    const topRelated = similarities
      .filter(item => item.score >= 5)
      .sort((a, b) => b.score - a.score)
      .slice(0, 5)
      .map(item => item.id);

    content.relatedContent = topRelated;
    await content.save();

    return topRelated;
  } catch (error) {
    console.error('Error finding related content:', error);
    return [];
  }
};

export const getRecommendations = async (contentId, limit = 10) => {
  try {
    const content = await Content.findById(contentId);
    if (!content) return [];

    const allContent = await Content.find({ _id: { $ne: contentId } });

    const recommendations = allContent
      .map(item => ({
        content: item,
        score: calculateSimilarity(content, item)
      }))
      .filter(item => item.score >= 3)
      .sort((a, b) => b.score - a.score)
      .slice(0, limit)
      .map(item => item.content);

    return recommendations;
  } catch (error) {
    console.error('Error getting recommendations:', error);
    return [];
  }
};
