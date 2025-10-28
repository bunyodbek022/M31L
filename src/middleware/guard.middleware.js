import { config } from '../config/index.js';
import { verifyToken } from '../helper/jwt.js';
import User from '../model/users.model.js';
import { ApiError } from './apiError.js';

export const authGuard = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return next(new ApiError(401, 'Token mavjud emas'));
    }

    const token = authHeader.split(' ')[1];

    const verified = await verifyToken(token, config.jwt.accessSecret);
    const user = await User.findById(verified.id);
    req.user = user;
    next();
  } catch (error) {
    return next(error);
  }
};

export const roleGuard = (...role) => {
  //['admin', 'customer', 'deliveryStaff']
  return (req, res, next) => {
    const userRoles = req.user.role; // student - error, admin -> next
    console.log({ user: req.user });
    console.log({ userRoles });
    console.log({ role });

    if (!userRoles.some((r) => role.includes(r))) {
      throw new Error('Your roles are not allowed to access this route');
    }
    next();
  };
};

export const selfGuard = (req, res, next) => {
  try {
    let { id } = req.params;
    let { role } = req.user;
    if (id == req.user.id || role == 'admin') {
      next();
      return;
    }
    res.status(405).send({ message: 'Not allowed !' });
  } catch (error) {
    return next(error);
  }
};
