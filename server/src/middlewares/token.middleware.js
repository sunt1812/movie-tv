import jwt from 'jsonwebtoken';
import responseHandler from '../handlers/response.handler.js';
import userModel from '../models/user.model.js';

const signWithToken = (id) => {
  return jwt.sign({ data: id }, process.env.TOKEN_SECRET_KEY, {
    expiresIn: '24h',
  });
};

const tokenDecode = (req) => {
  try {
    const bearerHeader = req.headers['authorization'];
    if (bearerHeader) {
      const token = bearerHeader.split(' ')[1];
      return jwt.verify(token, process.env.TOKEN_SECRET_KEY);
    }

    return false;
  } catch {
    return false;
  }
};

const auth = async (req, res, next) => {
  const tokenDecoded = tokenDecode(req);
  if (!tokenDecoded) return responseHandler.unauthorize(res);

  const user = await userModel.findById(tokenDecoded.data);
  if (!user) return responseHandler.unauthorize(res);

  req.user = user;

  next();
};

export default { auth, tokenDecode, signWithToken };
