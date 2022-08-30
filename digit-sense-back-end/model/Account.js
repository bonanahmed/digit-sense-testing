import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate";

const accountSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: false, max: 255 },
  username: { type: String, required: true, max: 255, unique: true },
  password: { type: String, required: true },
  age: { type: Number, required: true },
  address: { type: String, required: true },
  profilePicture: { type: String, required: true },
  role: {
    type: String,
    required: true,
  },
  createdBy: {
    type: String,
  },
  createdDate: {
    type: Date,
    default: Date.now,
  },
  updatedBy: {
    type: String,
  },
  updatedDate: {
    type: Date,
    default: Date.now,
  },
});

accountSchema.plugin(mongoosePaginate);
export default mongoose.model("account", accountSchema, "account");
