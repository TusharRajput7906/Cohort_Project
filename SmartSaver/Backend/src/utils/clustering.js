import Content from '../models/Content.js';
import { extractTopics } from './tagging.js';

// Simple clustering based on tags, topics, and content similarity
export const assignCluster = async (contentId) => {
  try {
    const content = await Content.findById(contentId);
    if (!content) return;

    const allTags = [...content.tags, ...content.autoTags];
    const contentText = `${content.title} ${content.description} ${content.content}`;
    const topics = extractTopics(contentText);

    // Find the most common cluster based on similar tags/topics
    const allContent = await Content.find({ _id: { $ne: contentId } });

    const clusterScores = {};

    allContent.forEach(item => {
      if (!item.cluster) return;

      const itemTags = [...item.tags, ...item.autoTags];
      const commonTags = allTags.filter(tag => itemTags.includes(tag));
      const commonTopics = topics.filter(topic => item.topics?.includes(topic));

      const score = (commonTags.length * 2) + (commonTopics.length * 3) + 
                    (item.type === content.type ? 1 : 0);

      if (score > 0) {
        clusterScores[item.cluster] = (clusterScores[item.cluster] || 0) + score;
      }
    });

    // Assign to highest scoring cluster or create new one
    const sortedClusters = Object.entries(clusterScores).sort((a, b) => b[1] - a[1]);

    if (sortedClusters.length > 0 && sortedClusters[0][1] >= 3) {
      content.cluster = sortedClusters[0][0];
    } else {
      // Create new cluster based on primary tag or topic
      const primaryTag = allTags[0] || topics[0] || content.type;
      content.cluster = primaryTag.replace(/\s+/g, '-').toLowerCase();
    }

    content.topics = topics;
    await content.save();

  } catch (error) {
    console.error('Error assigning cluster:', error);
  }
};

export const updateClusters = async () => {
  try {
    const allContent = await Content.find();

    // Recalculate clusters for items with weak connections
    for (const content of allContent) {
      const sameCluster = allContent.filter(
        item => item.cluster === content.cluster && item._id.toString() !== content._id.toString()
      );

      // If cluster has only 1 item, try to reassign
      if (sameCluster.length === 0 && allContent.length > 1) {
        await assignCluster(content._id);
      }
    }
  } catch (error) {
    console.error('Error updating clusters:', error);
  }
};

export const getClusterStats = async () => {
  try {
    const stats = await Content.aggregate([
      {
        $group: {
          _id: '$cluster',
          count: { $sum: 1 },
          types: { $addToSet: '$type' }
        }
      },
      {
        $sort: { count: -1 }
      }
    ]);

    return stats;
  } catch (error) {
    console.error('Error getting cluster stats:', error);
    return [];
  }
};
