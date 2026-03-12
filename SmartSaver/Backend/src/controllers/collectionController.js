import Collection from '../models/Collection.js';
import Content from '../models/Content.js';

// Create collection
export const createCollection = async (req, res) => {
  try {
    const { name, description, color, icon } = req.body;

    const collection = new Collection({
      name,
      description,
      color,
      icon
    });

    await collection.save();

    res.status(201).json({
      success: true,
      data: collection
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Get all collections
export const getAllCollections = async (req, res) => {
  try {
    const collections = await Collection.find().populate('content');

    res.json({
      success: true,
      data: collections
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Get single collection
export const getCollectionById = async (req, res) => {
  try {
    const collection = await Collection.findById(req.params.id).populate('content');

    if (!collection) {
      return res.status(404).json({
        success: false,
        message: 'Collection not found'
      });
    }

    res.json({
      success: true,
      data: collection
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Update collection
export const updateCollection = async (req, res) => {
  try {
    const { name, description, color, icon } = req.body;

    const collection = await Collection.findByIdAndUpdate(
      req.params.id,
      { name, description, color, icon, updatedAt: Date.now() },
      { new: true }
    );

    if (!collection) {
      return res.status(404).json({
        success: false,
        message: 'Collection not found'
      });
    }

    res.json({
      success: true,
      data: collection
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Delete collection
export const deleteCollection = async (req, res) => {
  try {
    const collection = await Collection.findByIdAndDelete(req.params.id);

    if (!collection) {
      return res.status(404).json({
        success: false,
        message: 'Collection not found'
      });
    }

    res.json({
      success: true,
      message: 'Collection deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Add content to collection
export const addToCollection = async (req, res) => {
  try {
    const { contentId } = req.body;
    const collectionId = req.params.id;

    const collection = await Collection.findById(collectionId);
    if (!collection) {
      return res.status(404).json({
        success: false,
        message: 'Collection not found'
      });
    }

    const content = await Content.findById(contentId);
    if (!content) {
      return res.status(404).json({
        success: false,
        message: 'Content not found'
      });
    }

    if (!collection.content.includes(contentId)) {
      collection.content.push(contentId);
      collection.updatedAt = Date.now();
      await collection.save();
    }

    const updatedCollection = await Collection.findById(collectionId).populate('content');

    res.json({
      success: true,
      data: updatedCollection
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Remove content from collection
export const removeFromCollection = async (req, res) => {
  try {
    const { contentId } = req.params;
    const collectionId = req.params.id;

    const collection = await Collection.findById(collectionId);
    if (!collection) {
      return res.status(404).json({
        success: false,
        message: 'Collection not found'
      });
    }

    collection.content = collection.content.filter(
      id => id.toString() !== contentId
    );
    collection.updatedAt = Date.now();
    await collection.save();

    const updatedCollection = await Collection.findById(collectionId).populate('content');

    res.json({
      success: true,
      data: updatedCollection
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
