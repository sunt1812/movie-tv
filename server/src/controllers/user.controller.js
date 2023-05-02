import userModel from '../models/user.model.js';
import responseHandler from '../handlers/response.handler.js';
import tokenMiddleware from '../middlewares/token.middleware.js';

const register = async (req, res) => {
  try {
    const { username, displayName, password } = req.body;
    const checkUser = await userModel.findOne({ username });
    if (checkUser)
      return responseHandler.badrequest(res, 'username already used');

    const user = new userModel();
    user.username = username;
    user.displayName = displayName;
    user.setPassword(password);

    await user.save();

    const token = tokenMiddleware.signWithToken(user.id);
    responseHandler.created(res, { token, ...user._doc });
  } catch {
    responseHandler.error(res);
  }
};

const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await userModel
      .findOne({ username })
      .select('username password salt id displayName');
    if (!user) return responseHandler.badrequest(res, 'User not exist');
    if (!user.validPassword(password))
      return responseHandler.badrequest(res, 'Wrong Password');
    user.username = undefined;
    user.password = undefined;
    const token = tokenMiddleware.signWithToken(user.id);
    responseHandler.created(res, { token, ...user._doc });
  } catch {
    responseHandler.error(res);
  }
};

const updatePassword = async (req, res) => {
  try {
    const { password, newPassword } = req.body;

    const user = await userModel
      .findById(req.user._id)
      .select('password id salt');
    if (!user) return responseHandler.unauthorize(res);
    if (!user.validPassword(password))
      return responseHandler.badrequest(res, 'Wrong Password');

    user.setPassword(newPassword);
    await user.save();
    responseHandler.ok(res, { _id: user._id });
  } catch {
    responseHandler.error(res);
  }
};
const getInfoUser = async (req, res) => {
  try {
    const user = await userModel.findById(req.user._id);
    if (!user) return responseHandler.notfound(res);

    responseHandler.ok(res, user);
  } catch {
    responseHandler.error(res);
  }
};
export default { register, login, updatePassword, getInfoUser };
