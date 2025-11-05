import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
const userSchema = new mongoose.Schema({
  name: { type: String, trim: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phone: { type: String, required: true, unique: true },
  role: {
    type: String,
    enum: ['customer', 'deliveryStaff', 'admin'],
    default: 'customer',
  },
  isActive: { type: Boolean, default: false },
  verifyCode: {
    type: String,
    select: false,
  },
});
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});
userSchema.methods.comparePassword = async function (userPassword) {
  const isValidPassword = await bcrypt.compare(userPassword, this.password);

  return isValidPassword;
};
export default mongoose.model('User', userSchema);
