/* eslint-disable no-unused-vars */
import User from '../model/users.model.js';
import {
  verifyToken,
  generateAccessToken,
  generateRefreshToken,
} from '../helper/jwt.js';
import { ApiError } from '../middleware/apiError.js';
import * as bcrypt from 'bcrypt';

export const authController = {
  signup: async (req, res, next) => {
    try {
      const { name, phone, password, email, role } = req.body;
      const userExist = await User.findOne({ email: email.toLowerCase() });
      if (userExist) {
        return next(new ApiError(403, "Email oldin ro'yxatdan o'tgan"));
      }

      const newUser = await User.create({
        name,
        phone,
        email: email.toLowerCase(),
        password,
        role,
      });

      const accessToken = generateAccessToken(newUser);
      const refreshToken = generateRefreshToken(newUser);

      res.status(201).json({
        success: true,
        message: "Muvaffaqiyatli ro'yxatdan o'tdingiz",
        accessToken,
        refreshToken,
      });
    } catch (error) {
      next(error);
    }
  },

  signin: async (req, res, next) => {
    try {
      const { email, password } = req.body;
      console.log(req.body);
      const userData = await User.findOne({ email: email.toLowerCase() });
      console.log(userData);
      if (!userData) return next(new ApiError(404, 'User topilmadi'));

      const isValidPassword = await userData.comparePassword(password);
      if (!isValidPassword)
        return next(new ApiError(401, "Email yoki parol noto'g'ri"));

      const accessToken = generateAccessToken(userData);
      const refreshToken = generateRefreshToken(userData);

      res.status(200).json({
        success: true,
        accessToken,
        refreshToken,
      });
    } catch (error) {
      next(error);
    }
  },

  profile: async (req, res, next) => {
    try {
      const user = await User.findById(req.user).select('-password');
      if (!user) return next(new ApiError(404, 'User topilmadi'));

      res.json(user);
    } catch (error) {
      next(error);
    }
  },

  // REFRESH
  updateAccess: async (req, res, next) => {
    try {
      const authHeader = req.headers.authorization;

      if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return next(new ApiError(401, "Refresh token yo'q"));
      }

      const refreshToken = authHeader.split(' ')[1];
      const decoded = await verifyToken(
        refreshToken,
        process.env.JWT_REFRESH_SECRET,
      );

      const user = await User.findById(decoded.id);
      if (!user) return next(new ApiError(404, 'User topilmadi'));

      const accessToken = generateAccessToken(user);
      res.status(200).json({
        success: true,
        accessToken,
      });
    } catch (error) {
      next(new ApiError(401, 'Yaroqsiz yoki muddati tugagan refresh token'));
    }
  },
};
