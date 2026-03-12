import mongoose from 'mongoose';

const highlightSchema = new mongoose.Schema({
  contentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Content',
    required: true
  },
  text: {
    type: String,
    required: true
  },
  note: {
    type: String,
    default: ''
  },
  color: {
    type: String,
    default: '#fbbf24'
  },
  position: {
    start: Number,
    end: Number
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

highlightSchema.index({ contentId: 1 });

const Highlight = mongoose.model('Highlight', highlightSchema);

export default Highlight;
