import cron from 'node-cron';
import Content from '../models/Content.js';

// Resurface old content based on various criteria
export const resurfaceContent = async () => {
  try {
    const now = new Date();
    const candidates = [];

    // Get content older than 1 week
    const oldContent = await Content.find({
      createdAt: { $lt: new Date(now - 7 * 24 * 60 * 60 * 1000) }
    }).sort({ lastAccessedAt: 1 });

    for (const content of oldContent) {
      const daysSinceCreated = (now - content.createdAt) / (1000 * 60 * 60 * 24);
      const daysSinceAccessed = (now - content.lastAccessedAt) / (1000 * 60 * 60 * 24);

      // Resurfacing criteria
      let shouldResurface = false;
      let reason = '';

      // 1. Content from exactly 1, 2, 3, 6 months ago
      const monthsAgo = [30, 60, 90, 180];
      for (const days of monthsAgo) {
        if (Math.abs(daysSinceCreated - days) <= 2) {
          shouldResurface = true;
          reason = `${Math.round(days / 30)} months ago you saved this`;
          break;
        }
      }

      // 2. Haven't accessed in 30+ days
      if (!shouldResurface && daysSinceAccessed >= 30) {
        shouldResurface = true;
        reason = `Not accessed in ${Math.round(daysSinceAccessed)} days`;
      }

      // 3. Related content recently added
      if (!shouldResurface && content.relatedContent.length > 0) {
        const recentlyAdded = await Content.find({
          _id: { $in: content.relatedContent },
          createdAt: { $gt: new Date(now - 7 * 24 * 60 * 60 * 1000) }
        });

        if (recentlyAdded.length > 0) {
          shouldResurface = true;
          reason = 'Related to recently saved content';
        }
      }

      if (shouldResurface && !isRecentlyResurfaced(content)) {
        candidates.push({
          content,
          reason
        });
      }
    }

    // Resurface top 5 candidates
    const toResurface = candidates.slice(0, 5);

    for (const { content, reason } of toResurface) {
      content.resurfacedAt = now;
      content.resurfaceCount += 1;
      content.resurfaceReason = reason;
      await content.save();
      
      console.log(`Resurfaced: ${content.title} - ${reason}`);
    }

    return toResurface.length;
  } catch (error) {
    console.error('Error resurfacing content:', error);
    return 0;
  }
};

const isRecentlyResurfaced = (content) => {
  if (!content.resurfacedAt) return false;
  
  const daysSinceResurfaced = (new Date() - content.resurfacedAt) / (1000 * 60 * 60 * 24);
  return daysSinceResurfaced < 7; // Don't resurface if done within last 7 days
};

// Run resurfacing every day at 9 AM
export const startResurfacingCron = () => {
  cron.schedule('0 9 * * *', async () => {
    console.log('Running daily resurfacing...');
    const count = await resurfaceContent();
    console.log(`Resurfaced ${count} items`);
  });

  console.log('Resurfacing cron job started (runs daily at 9 AM)');
};

// Manual trigger for resurfacing
export const triggerResurfacing = async () => {
  return await resurfaceContent();
};
