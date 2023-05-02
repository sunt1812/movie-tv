import mongoose, { Schema } from 'mongoose';

const favoriteSchema = new mongoose.Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
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
const favoriteModel =
  mongoose.models.favoriteMode || mongoose.model('Favorite', favoriteSchema);
export default favoriteModel;
