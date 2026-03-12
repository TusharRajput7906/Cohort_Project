import mongoose from 'mongoose';

const collectionSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    default: ''
  },
  color: {
    type: String,
    default: '#6366f1'
  },
  icon: {
    type: String,
    default: '📁'
  },
  content: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Content'
  }],
  isDefault: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

collectionSchema.index({ name: 1 });

const Collection = mongoose.model('Collection', collectionSchema);

export default Collection;
