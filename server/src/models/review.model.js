import mongoose, { Schema } from 'mongoose';

const reviewSchema = new mongoose.Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  mediaType: {
    type: String,
    enum: ['tv', 'movie'],
    required: true,
  },
  mediaId: {
    type: Number,
    required: true,
  },
  mediaTitle: {
    type: String,
    required: true,
  },
  mediaPoster: {
    type: String,
    required: true,
  },
  mediaRate: {
    type: Number,
    required: true,
  },
});
const reviewModel =
  mongoose.models.reviewModel || mongoose.model('Review', reviewSchema);
export default reviewModel;
