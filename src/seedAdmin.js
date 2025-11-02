import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import User from './model/users.model.js';
import { config } from './config/index.js';

const createAdmin = async () => {
  try {
    await mongoose.connect(config.db.url);
    console.log('MongoDB bilan ulanish muvaffaqiyatli');

    const existingAdmin = await User.findOne({ role: 'admin' });
    if (existingAdmin) {
      console.log('Admin allaqachon mavjud:', existingAdmin.email);
      process.exit(0);
    }

    const adminData = {
      name: 'Super Admin',
      email: 'gulomjonovbunyodbek60@gmail.com',
      password: 'admin123',
      phone: '+998939349340',
      role: 'admin',
    };

    const hashedPassword = await bcrypt.hash(adminData.password, 10);
    adminData.password = hashedPassword;

    const admin = await User.create(adminData);
    console.log('Admin muvaffaqiyatli yaratildi!');
    console.log(`Login: ${admin.email}`);
    console.log(`Password: admin123`);

    process.exit(0);
  } catch (err) {
    console.error('Xato:', err.message);
    process.exit(1);
  }
};

createAdmin();
