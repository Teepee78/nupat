import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export const SECRET_KEY = process.env.NUPAT_JWT;

/**
 * authentication middleware to verify tokens and authorize users
 */
export const authenticate = async (req, res, next) => {
  try {
    let token = req.header('Authorization');

    if (!token) {
      token = req.cookies['Authorization'];

      if (!token) {
        return res.status(401).send('Unauthorized to perform request.');
      }
		}

		jwt.verify(token, SECRET_KEY);

    next();
	} catch (err) {
		console.log(err);
    res.status(401).send('Unauthorized to perform request.');
  }
};
