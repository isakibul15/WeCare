import mongoose from "mongoose";

const OTPSchema = mongoose.Schema(
    {
    otp: {
        type: String,
        required: true
    },
    date:{
        type: Date 
    },
    otpFor:{
        type: String
    }
}
);
const OTPModel = mongoose.model("otp", OTPSchema);
export default OTPModel;