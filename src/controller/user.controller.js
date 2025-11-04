import User from '../model/users.model.js';
import {
  customerUpdate,
  adminUpdateUserValidate,
} from '../validation/user.validation.js';
import { ApiError } from '../middleware/apiError.js';
export const getUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    res.status(200).json({ success: true, data: users });
  } catch (err) {
    next(err);
  }
};

export const getOneUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ message: 'User not found!' });
    }

    res.status(200).json({ success: true, data: user });
  } catch (err) {
    next(err);
  }
};

export const updateUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const schema =
      req.user.role === 'admin' ? adminUpdateUserValidate : customerUpdate;

    const validatedData = schema.parse(req.body);

    if (req.user.role !== 'admin' && req.user._id.toString() !== id) {
      throw next(
        new ApiError(
          403,
          'Siz faqat ozingizning profilingizni ozgartira olasiz',
        ),
      );
    }

    const updatedUser = await User.findByIdAndUpdate(id, validatedData, {
      new: true,
    });

    if (!updatedUser) {
      throw new ApiError(404, 'Foydalanuvchi topilmadi');
    }

    res.json({
      success: true,
      message: 'Foydalanuvchi muvaffaqiyatli yangilandi',
      data: updatedUser,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteUser = async (req, res, next) => {
  try {
    const { id } = req.params;

    const result = await User.findByIdAndDelete(id);

    if (!result) {
      return res.status(404).json({ message: 'User not found!' });
    }

    res.status(200).json({
      success: true,
      message: 'User deleted successfully!',
    });
  } catch (err) {
    next(err);
  }
};
