import responseHandler from '../handlers/response.handler.js';
import tokenMiddleware from '../middlewares/token.middleware.js';
import favoriteModel from '../models/favorite.model.js';
import reviewModel from '../models/review.model.js';
import userModel from '../models/user.model.js';
import tmdbApi from '../tmdb/tmdb.api.js';

const getList = async (req, res) => {
  try {
    const { page } = req.query;
    const { mediaType, mediaCategory } = req.params;
    const response = await tmdbApi.mediaList({
      mediaType,
      mediaCategory,
      page,
    });
    responseHandler.ok(res, response);
  } catch {
    responseHandler.error(res);
  }
};
const getGenres = async (req, res) => {
  try {
    const { mediaType } = req.params;
    const response = await tmdbApi.mediaGenres({ mediaType });
    responseHandler.ok(res, response);
  } catch {
    responseHandler.error(res);
  }
};
const search = async (req, res) => {
  try {
    const { page, query } = req.query;
    const { mediaType } = req.params;

    const search = await tmdbApi.searchMedias({
      mediaType: mediaType === 'people' ? 'person' : mediaType,
      page,
      query,
    });
    responseHandler.ok(res, search);
  } catch {
    responseHandler.error(res);
  }
};

const getDetail = async (req, res) => {
  try {
    const { mediaType, mediaId } = req.params;
    const params = { mediaType, mediaId };
    const media = await tmdbApi.mediaDetail(params);
    media.credits = await tmdbApi.mediaCredits(params);
    media.videos = await tmdbApi.mediaVideos(params);
    media.images = await tmdbApi.mediaImages(params);
    media.recommens = await tmdbApi.MediaRecorder(params);
    const tokenDecoded = tokenMiddleware.tokenDecode(req);

    if (tokenDecoded) {
      const user = await userModel.findById(tokenDecoded.data);
      if (user) {
        const isFavorite = await favoriteModel.findOne({
          user: user.id,
          mediaId,
        });
        media.isFavorite = isFavorite !== null;
      }
    }
    media.reviews = await reviewModel
      .find({ mediaId })
      .populate('user')
      .sort('-createdAt');
    responseHandler.ok(res, media);
  } catch {
    responseHandler.error(res);
  }
};
export default { getList, getGenres, getDetail, search };
