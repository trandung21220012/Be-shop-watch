import mongoose from "mongoose";
const staffSchema = new mongoose.Schema({
  name: String,
  date_of_birth: Date,
  age: Number,
  country: String,
  id_card: Number,
  phone_number: Number,

});
const StaffModel = mongoose.model('staff', staffSchema);
export default StaffModel