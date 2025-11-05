import mongoose, { Schema } from 'mongoose';
const delivery_staffSchema = new mongoose.Schema({
  user_id: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  vehicle_number: { type: String, required: true },
  district_id: {
    type: Schema.Types.ObjectId,
    ref: 'District',
  },
});
export default mongoose.model('Delivery_staff', delivery_staffSchema);
