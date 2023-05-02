import responseHandler from '../handlers/response.handler.js';
import reviewModel from '../models/review.model.js';

const addReview = async (req, res) => {
  try {
    const review = await new reviewModel({
      user: req.user,
      ...req.body,
    });
    await review.save();
    responseHandler.created(res, review);
  } catch {
    responseHandler.error(res);
  }
};

const getReviewsOfUser = async (req, res) => {
  try {
    const review = await reviewModel
      .find({
        user: req.user.id,
      })
      .sort('-createdAt');
    responseHandler.ok(res, review);
  } catch {
    responseHandler.error(res);
  }
};

const removeReview = async (req, res) => {
  try {
    const { reviewId } = req.params;

    const review = await reviewModel.findOneAndDelete({
      _id: reviewId,
      user: req.user.id,
    });
    if (!review) responseHandler.notfound(res);

    if (5 === 5) responseHandler.ok(res, review);
  } catch {
    responseHandler.error(res);
  }
};

export default { addReview, removeReview, getReviewsOfUser };
