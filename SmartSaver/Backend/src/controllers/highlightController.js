import Highlight from '../models/Highlight.js';
import Content from '../models/Content.js';

// Create highlight
export const createHighlight = async (req, res) => {
  try {
    const { contentId, text, note, color, position } = req.body;

    const content = await Content.findById(contentId);
    if (!content) {
      return res.status(404).json({
        success: false,
        message: 'Content not found'
      });
    }

    const highlight = new Highlight({
      contentId,
      text,
      note,
      color,
      position
    });

    await highlight.save();

    res.status(201).json({
      success: true,
      data: highlight
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Get highlights for content
export const getHighlightsByContent = async (req, res) => {
  try {
    const highlights = await Highlight.find({ contentId: req.params.contentId })
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      data: highlights
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Get all highlights
export const getAllHighlights = async (req, res) => {
  try {
    const highlights = await Highlight.find()
      .populate('contentId')
      .sort({ createdAt: -1 })
      .limit(50);

    res.json({
      success: true,
      data: highlights
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Update highlight
export const updateHighlight = async (req, res) => {
  try {
    const { note, color } = req.body;

    const highlight = await Highlight.findByIdAndUpdate(
      req.params.id,
      { note, color },
      { new: true }
    );

    if (!highlight) {
      return res.status(404).json({
        success: false,
        message: 'Highlight not found'
      });
    }

    res.json({
      success: true,
      data: highlight
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Delete highlight
export const deleteHighlight = async (req, res) => {
  try {
    const highlight = await Highlight.findByIdAndDelete(req.params.id);

    if (!highlight) {
      return res.status(404).json({
        success: false,
        message: 'Highlight not found'
      });
    }

    res.json({
      success: true,
      message: 'Highlight deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
