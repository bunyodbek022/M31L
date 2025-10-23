import mongoose from "mongoose";
const customerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true, unique: true },
});

customerSchema.methods.comparePasword = async function () {
  
}
export default mongoose.model("Customer", customerSchema);
