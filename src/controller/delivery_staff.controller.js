import Delivery_staff from '../model/delivery_staffModel.js';
import User from '../model/users.model.js';
//GET ALL
export const getDelivery_staffs = async (req, res, next) => {
  try {
    const staffs = await Delivery_staff.find().populate('district_id');
    res.status(200).json({
      status: true,
      count: staffs.length,
      data: staffs,
    });
  } catch (err) {
    next(err);
  }
};

// GET ONE
export const getOneDelivery_staff = async (req, res, next) => {
  try {
    const { id } = req.params;
    const staff = await Delivery_staff.findById(id).populate('district_id');

    if (!staff) {
      return res
        .status(404)
        .json({ status: false, message: 'Delivery staff not found' });
    }

    res.status(200).json({
      status: true,
      data: staff,
    });
  } catch (err) {
    next(err);
  }
};

// CREATE STAFF
export const addDelivery_staff = async (req, res, next) => {
  try {
    const { user_id, vehicle_number, district_id } = req.body;

    const userCheck = await User.findById(user_id);
    if (!userCheck) {
      return res.status(404).json({
        status: false,
        message: 'User not found',
      });
    }
    const existingStaff = await Delivery_staff.findOne({
      phone: userCheck.phone,
    });
    if (existingStaff) {
      return res.status(400).json({
        status: false,
        message: 'This user is already registered as delivery staff',
      });
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
      status: true,
      message: 'Delivery staff added successfully',
      data: delivery_staff,
    });
  } catch (err) {
    console.error(err);
    next(err);
  }
};

// UPDATE STAFF
export const updateDelivery_staff = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;

    const updatedStaff = await Delivery_staff.findByIdAndUpdate(
      id,
      updatedData,
      { new: true, runValidators: true },
    );

    if (!updatedStaff) {
      return res.status(404).send('Delivery staff is not found!');
    }

    res.status(200).json({
      message: 'Delivery staff updated successfully!',
      data: updatedStaff,
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
};

// DELETE
export const deleteDelivery_staff = async (req, res, next) => {
  try {
    const { id } = req.params;

    const staff = await Delivery_staff.findByIdAndDelete(id);
    if (!staff) {
      return res.status(404).json({
        status: false,
        message: 'Delivery staff not found',
      });
    }

    await User.updateOne({ _id: staff.user_id }, { $set: { role: 'user' } });

    res.status(200).json({
      status: true,
      message: 'Delivery staff deleted successfully',
    });
  } catch (err) {
    next(err);
  }
};
