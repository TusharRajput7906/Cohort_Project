import mongoose from 'mongoose';

const contentSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true,
    enum: ['article', 'tweet', 'image', 'youtube', 'pdf']
  },
  url: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    default: ''
  },
  content: {
    type: String,
    default: ''
  },
  thumbnail: {
    type: String,
    default: ''
  },
  tags: [{
    type: String
  }],
  autoTags: [{
    type: String
  }],
  cluster: {
    type: String,
    default: ''
  },
  topics: [{
    type: String
  }],
  relatedContent: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Content'
  }],
  metadata: {
    author: String,
    publishedDate: Date,
    source: String,
    fileSize: String
  },
  resurfacedAt: {
    type: Date,
    default: null
  },
  resurfaceCount: {
    type: Number,
    default: 0
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  lastAccessedAt: {
    type: Date,
    default: Date.now
  }
});

// MongoDB cannot build a compound index across multiple array fields.
// Keep these as separate multikey indexes for filtering/searching.
contentSchema.index({ tags: 1 });
contentSchema.index({ autoTags: 1 });
contentSchema.index({ topics: 1 });
contentSchema.index({ cluster: 1 });
contentSchema.index({ createdAt: -1 });

const Content = mongoose.model('Content', contentSchema);

export default Content;
