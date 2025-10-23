import mongoose, { Schema } from "mongoose";
const districtSchema = new mongoose.Schema({
  order_id: {
    type: Schema.Types.ObjectId,
    ref: "Order",
    required: true,
  },
  product_id: {
    type: Schema.Types.ObjectId,
    ref: "Water_product",
    required: true,
  },
  quantity: { type: Number, required: true },
  total_price: { type: Number, required: true, min: 0 },
});
export default mongoose.model("District", districtSchema);
