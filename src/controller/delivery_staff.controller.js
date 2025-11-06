import Delivery_staff from '../model/delivery_staffModel.js';
import User from '../model/users.model.js';
import { searchAndPaginate } from '../helper/searchAndPaginate.js';
import { ApiError } from '../middleware/apiError.js';
export const DeliveryStaffController = {
  // Barcha delivery stafflarni olish (search + paginate + populate)
  async getAll(req, res, next) {
    try {
      const { limit, page, search } = req.query;
      const lim = limit ? parseInt(limit, 10) : 10;
      const pa = page ? parseInt(page, 10) : 1;
      const off = (pa - 1) * lim;

      const { results, total } = await searchAndPaginate(
        search,
        Delivery_staff,
        lim,
        off,
        [{ path: 'district_id' }],
      );

      res.status(200).json({
        success: true,
        message: 'Delivery stafflar muvaffaqiyatli olindi',
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

  //  Bitta delivery staffni olish
  async getOne(req, res, next) {
    try {
      const { id } = req.params;
      const staff = await Delivery_staff.findById(id).populate('district_id');

      if (!staff) {
        return next(new ApiError(404, 'Delivery Staff topilmadi'));
      }

      res.status(200).json({
        success: true,
        message: 'Delivery staff topildi',
        data: staff,
      });
    } catch (err) {
      next(err);
    }
  },

  // Delivery staff qo‘shish
  async add(req, res, next) {
    try {
      const { user_id, vehicle_number, district_id } = req.body;

      const userCheck = await User.findById(user_id);
      if (!userCheck) {
        return next(new ApiError(404, 'User topilmadi'));
      }

      const existingStaff = await Delivery_staff.findOne({
        phone: userCheck.phone,
      });
      if (existingStaff) {
        return next(
          new ApiError(
            400,
            "Bu user allaqachon delivery staff sifatida ro'yxatdan o'tgan",
          ),
        );
      }

      const delivery_staff = await Delivery_staff.create({
        user_id,
        vehicle_number,
        district_id,
      });

      await User.updateOne(
        { _id: user_id },
        { $set: { role: 'delivery_staff' } },
      );

      res.status(201).json({
        success: true,
        message: "Delivery staff muvaffaqiyatli qo'shildi",
        data: delivery_staff,
      });
    } catch (err) {
      next(err);
    }
  },

  //  Delivery staffni yangilash
  async update(req, res, next) {
    try {
      const { id } = req.params;
      const updatedData = req.body;

      const updatedStaff = await Delivery_staff.findByIdAndUpdate(
        id,
        updatedData,
        { new: true, runValidators: true },
      );

      if (!updatedStaff) {
        return next(new ApiError(404, 'Delivery Staff topilmadi'));
      }

      res.status(200).json({
        success: true,
        message: 'Delivery staff muvaffaqiyatli yangilandi',
        data: updatedStaff,
      });
    } catch (err) {
      next(err);
    }
  },

  //  Delivery staffni o‘chirish
  async delete(req, res, next) {
    try {
      const { id } = req.params;
      const staff = await Delivery_staff.findByIdAndDelete(id);

      if (!staff) {
        return res.status(404).json({
          success: false,
          message: 'Delivery staff topilmadi',
        });
      }

      // User rolini tiklash
      await User.updateOne({ _id: staff.user_id }, { $set: { role: 'user' } });

      res.status(200).json({
        success: true,
        message: "Delivery staff muvaffaqiyatli o'chirildi",
        data: staff,
      });
    } catch (err) {
      next(err);
    }
  },
};
