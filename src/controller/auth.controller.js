/* eslint-disable no-unused-vars */
import User from '../model/users.model.js';
import {
  verifyToken,
  generateAccessToken,
  generateRefreshToken,
} from '../helper/jwt.js';
import { ApiError } from '../middleware/apiError.js';
import { sendVerificationCode } from '../../services/email.service.js';

export const authController = {
  // Ro‘yxatdan o‘tish
  async signup(req, res, next) {
    try {
      const { name, phone, password, email, role } = req.body;

      const userExist = await User.findOne({ email: email.toLowerCase() });
      if (userExist) {
        return next(new ApiError(403, "Email oldin ro'yxatdan o'tgan"));
      }

      const code = Math.floor(100000 + Math.random() * 900000);

      const newUser = await User.create({
        name,
        phone,
        email: email.toLowerCase(),
        password,
        role,
        isActive: false,
        verifyCode: code,
      });

      await sendVerificationCode(email, code);
      res.status(201).json({
        success: true,
        message: 'Varify code emailingizga yuborildi',
        data: {
          user: {
            id: newUser._id,
            name: newUser.name,
            email: newUser.email,
            role: newUser.role,
            isActive: newUser.isActive,
          },
        },
      });
    } catch (error) {
      next(error);
    }
  },
  // User activete
  async verifyEmail(req, res, next) {
    try {
      const { email, code } = req.body;
      const user = await User.findOne({ email }).select('+verifyCode');
      if (!user) return res.status(404).json({ message: 'User topilmadi' });
      if (user.isActive)
        return res
          .status(400)
          .json({ message: 'User allaqachon faollashtirilgan' });
      if (user.verifyCode !== code) {
        console.log(user.verifyCode);
        return res.status(400).json({ message: "Noto'gri kod" });
      }
      user.isActive = true;
      user.verifyCode = null;
      await user.save();
      res
        .status(200)
        .json({ success: true, message: 'Email muvaffaqiyatli tasdiqlandi' });
    } catch (error) {
      next(error);
    }
  },
  // Tizimga kirish
  async signin(req, res, next) {
    try {
      const { email, password } = req.body;

      const userData = await User.findOne({ email: email.toLowerCase() });
      if (!userData) return next(new ApiError(404, 'User topilmadi'));

      const isValidPassword = await userData.comparePassword(password);
      if (!isValidPassword)
        return next(new ApiError(401, "Email yoki parol noto'g'ri"));

      const accessToken = generateAccessToken(userData);
      const refreshToken = generateRefreshToken(userData);

      res.status(200).json({
        success: true,
        message: 'Kirish muvaffaqiyatli amalga oshirildi',
        data: {
          user: {
            id: userData._id,
            name: userData.name,
            email: userData.email,
            role: userData.role,
          },
          accessToken,
          refreshToken,
        },
      });
    } catch (error) {
      next(error);
    }
  },

  //  Profilni olish
  async profile(req, res, next) {
    try {
      const user = await User.findById(req.user).select('-password');
      if (!user) return next(new ApiError(404, 'User topilmadi'));

      const { password, verifyCode, ...safeUser } = user.toObject();
      res.status(200).json({
        success: true,
        message: 'Foydalanuvchi profili',
        data: safeUser,
      });
    } catch (error) {
      next(error);
    }
  },

  //  Refresh token orqali yangilash
  async updateAccess(req, res, next) {
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
        message: 'Access token yangilandi',
        data: { accessToken },
      });
    } catch (error) {
      next(new ApiError(401, 'Yaroqsiz yoki muddati tugagan refresh token'));
    }
  },
};
