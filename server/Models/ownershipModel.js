import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const ownerTransferSchema = mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
        type: String,
        required: true,
},
    image: {
        type: String,
      },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("Ownership", ownerTransferSchema);

export default Ownership;
