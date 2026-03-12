import Content from '../models/Content.js';
import { generateTags } from '../utils/tagging.js';
import { assignCluster, updateClusters } from '../utils/clustering.js';
import { findRelatedContent } from '../utils/recommendations.js';
import { extractMetadata } from '../utils/metadata.js';
import { semanticSearchWithExplanation } from '../utils/semanticSearch.js';

// Create new content
export const createContent = async (req, res) => {
  try {
    const { type, url, title, description, content, thumbnail, tags } = req.body;

    // Extract metadata from URL
    const metadata = await extractMetadata(url, type);

    // Generate automatic tags
    const textForTagging = `${title} ${description} ${content}`;
    const autoTags = generateTags(textForTagging);

    // Create content
    const newContent = new Content({
      type,
      url,
      title,
      description,
      content,
      thumbnail,
      tags: tags || [],
      autoTags,
      metadata
    });

    await newContent.save();

    // Assign cluster
    await assignCluster(newContent._id);

    // Find related content
    await findRelatedContent(newContent._id);

    // Update all clusters
    await updateClusters();

    const savedContent = await Content.findById(newContent._id).populate('relatedContent');

    res.status(201).json({
      success: true,
      data: savedContent
    });
  } catch (error) {
    console.error('Error creating content:', error);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Get all content
export const getAllContent = async (req, res) => {
  try {
    const { type, cluster, tag, search, limit = 50, page = 1 } = req.query;

    const query = {};

    if (type) query.type = type;
    if (cluster) query.cluster = cluster;
    if (tag) query.$or = [{ tags: tag }, { autoTags: tag }];
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { content: { $regex: search, $options: 'i' } }
      ];
    }

    const skip = (page - 1) * limit;

    const content = await Content.find(query)
      .populate('relatedContent')
      .sort({ createdAt: -1 })
      .limit(parseInt(limit))
      .skip(skip);

    const total = await Content.countDocuments(query);

    res.json({
      success: true,
      data: content,
      total,
      page: parseInt(page),
      pages: Math.ceil(total / limit)
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Get single content
export const getContentById = async (req, res) => {
  try {
    const content = await Content.findById(req.params.id).populate('relatedContent');

    if (!content) {
      return res.status(404).json({
        success: false,
        message: 'Content not found'
      });
    }

    // Update last accessed time
    content.lastAccessedAt = new Date();
    await content.save();

    res.json({
      success: true,
      data: content
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Update content
export const updateContent = async (req, res) => {
  try {
    const { tags, title, description } = req.body;

    const content = await Content.findById(req.params.id);

    if (!content) {
      return res.status(404).json({
        success: false,
        message: 'Content not found'
      });
    }

    if (tags) content.tags = tags;
    if (title) content.title = title;
    if (description) content.description = description;

    await content.save();

    // Re-assign cluster and find related content
    await assignCluster(content._id);
    await findRelatedContent(content._id);

    const updatedContent = await Content.findById(content._id).populate('relatedContent');

    res.json({
      success: true,
      data: updatedContent
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Delete content
export const deleteContent = async (req, res) => {
  try {
    const content = await Content.findByIdAndDelete(req.params.id);

    if (!content) {
      return res.status(404).json({
        success: false,
        message: 'Content not found'
      });
    }

    // Remove from other content's related content
    await Content.updateMany(
      { relatedContent: req.params.id },
      { $pull: { relatedContent: req.params.id } }
    );

    res.json({
      success: true,
      message: 'Content deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Get knowledge graph data
export const getKnowledgeGraph = async (req, res) => {
  try {
    const content = await Content.find().populate('relatedContent').limit(100);

    const nodes = content.map(item => ({
      id: item._id.toString(),
      label: item.title,
      type: item.type,
      cluster: item.cluster,
      tags: [...item.tags, ...item.autoTags]
    }));

    const edges = [];
    content.forEach(item => {
      item.relatedContent.forEach(related => {
        edges.push({
          from: item._id.toString(),
          to: related._id.toString()
        });
      });
    });

    res.json({
      success: true,
      data: { nodes, edges }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Get clusters
export const getClusters = async (req, res) => {
  try {
    const clusters = await Content.aggregate([
      {
        $group: {
          _id: '$cluster',
          count: { $sum: 1 },
          items: { $push: { _id: '$_id', title: '$title', type: '$type' } }
        }
      },
      {
        $match: { _id: { $ne: '' } }
      }
    ]);

    res.json({
      success: true,
      data: clusters
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Get resurfaced content
export const getResurfacedContent = async (req, res) => {
  try {
    const content = await Content.find({
      resurfacedAt: { $ne: null }
    })
      .sort({ resurfacedAt: -1 })
      .limit(10)
      .populate('relatedContent');

    res.json({
      success: true,
      data: content
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Semantic search
export const semanticSearchContent = async (req, res) => {
  try {
    const { query } = req.query;

    if (!query) {
      return res.status(400).json({
        success: false,
        message: 'Query parameter is required'
      });
    }

    const results = await semanticSearchWithExplanation(query);

    res.json({
      success: true,
      data: results,
      count: results.length
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
