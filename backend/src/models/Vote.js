import mongoose from 'mongoose';

const voteSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  maxVoters: {
    type: Number,
    required: true
  },
  yesCount: {
    type: Number,
    default: 0
  },
  noCount: {
    type: Number,
    default: 0
  },
  isActive: {
    type: Boolean,
    default: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model('Vote', voteSchema); 