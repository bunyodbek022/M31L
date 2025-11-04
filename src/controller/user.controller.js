import User from '../model/users.model.js';
import { searchAndPaginate } from '../helper/searchAndPaginate.js';
import {
  customerUpdate,
  adminUpdateUserValidate,
} from '../validation/user.validation.js';
import { ApiError } from '../middleware/apiError.js';

export const UserController = {
  //  Barcha foydalanuvchilarni olish (search + paginate)
  async getAll(req, res, next) {
    try {
      const { limit, page, search } = req.query;
      const lim = limit ? parseInt(limit, 10) : 10;
      const pa = page ? parseInt(page, 10) : 1;
      const off = (pa - 1) * lim;

      const { results, total } = await searchAndPaginate(
        search,
        User,
        lim,
        off,
      );

      res.status(200).json({
        success: true,
        message: 'Foydalanuvchilar muvaffaqiyatli olindi',
        total,
        page: pa,
        limit: lim,
        count: results.length,
        data: results,
      });
    } catch (err) {
      next(err);
    }
  },

  //  Bitta foydalanuvchini olish
  async getOne(req, res, next) {
    try {
      const { id } = req.params;
      const user = await User.findById(id);

      if (!user) {
        return res.status(404).json({
          success: false,
          message: 'Foydalanuvchi topilmadi',
        });
      }

      res.status(200).json({
        success: true,
        message: 'Foydalanuvchi topildi',
        data: user,
      });
    } catch (err) {
      next(err);
    }
  },

  //  Foydalanuvchini yangilash
  async update(req, res, next) {
    try {
      const { id } = req.params;
      const schema =
        req.user.role === 'admin' ? adminUpdateUserValidate : customerUpdate;

      const validatedData = schema.parse(req.body);

      if (req.user.role !== 'admin' && req.user._id.toString() !== id) {
        return next(
          new ApiError(
            403,
            'Siz faqat ozingizning profilingizni o‘zgartira olasiz',
          ),
        );
      }

      const updatedUser = await User.findByIdAndUpdate(id, validatedData, {
        new: true,
      });

      if (!updatedUser) {
        return next(new ApiError(404, 'Foydalanuvchi topilmadi'));
      }

      res.status(200).json({
        success: true,
        message: 'Foydalanuvchi muvaffaqiyatli yangilandi',
        data: updatedUser,
      });
    } catch (err) {
      next(err);
    }
  },

  //  Foydalanuvchini o‘chirish
  async delete(req, res, next) {
    try {
      const { id } = req.params;
      const result = await User.findByIdAndDelete(id);

      if (!result) {
        return res.status(404).json({
          success: false,
          message: 'Foydalanuvchi topilmadi',
        });
      }

      res.status(200).json({
        success: true,
        message: 'Foydalanuvchi muvaffaqiyatli o‘chirildi',
        data: result,
      });
    } catch (err) {
      next(err);
    }
  },
};
