import mongoose from "mongoose";
const canboSchema = new mongoose.Schema({
    name: String,
    birthday: Number,
    country: String,
    id_card: String,
    phone_number: String,
});

const CanboModel = mongoose.model('canbo',canboSchema )
export default CanboModel 