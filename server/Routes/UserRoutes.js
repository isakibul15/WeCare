import express from "express";
import asyncHandler from "express-async-handler";
import { protect, admin } from "../Middleware/AuthMiddleware.js";
import generateToken from "../utils/generateToken.js";
import User from "../Models/UserModel.js";

const userRouter = express.Router();

// LOGIN
userRouter.post(
  "/login",
  asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        token: generateToken(user._id),
        createdAt: user.createdAt,
      });
    } else {
      res.status(401);
      throw new Error("Invalid Email or Password");
    }
  })
);

// REGISTER
userRouter.post(
  "/",
  asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;

    const userExists = await User.findOne({ email });

    if (userExists) {
      res.status(400);
      throw new Error("User already exists");
    }

    const user = await User.create({
      name,
      email,
      password,
    });

    if (user) {
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        token: generateToken(user._id),
      });
    } else {
      res.status(400);
      throw new Error("Invalid User Data");
    }
  })
);

// PROFILE
userRouter.get(
  "/profile",
  protect,
  asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);

    if (user) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        createdAt: user.createdAt,
      });
    } else {
      res.status(404);
      throw new Error("User not found");
    }
  })
);

// UPDATE PROFILE
userRouter.put(
  "/profile",
  protect,
  asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);
    console.log(req.body)

    if (user) {
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;
      user.password = req.body.password || user.password;

      // console.log(req.body.password.length)
      
      const updatedUser = await user.save();
      res.json({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        isAdmin: updatedUser.isAdmin,
        createdAt: updatedUser.createdAt,
        token: generateToken(updatedUser._id),
      });
    }
     else {
      res.status(404);
      throw new Error("User not found");
    }
  })
  
);

// GET ALL USER ADMIN
userRouter.get(
  "/",
  protect,
  admin,
  asyncHandler(async (req, res) => {
    const users = await User.find({});
    res.json(users);
  })
);

// router for getting otp
userRouter.post('/getOTP', async (req, res) => {
  const otp = Math.floor(Math.random() * (9999 - 1000) + 1000);
  try {
  const post = new OTPSchema({
    otp: otp,
    date: new Date(),
    otpFor: req.body.mail
  });
  console.log("hello" + post);
  await post.save()
    .then(data => {
      res.json(data.otp);
    })
  // const post = await OTPSchema.create({
  //   otp: otp,
  //   date: new Date(), 
  //   otpFor: req.body.mail
  // });

  }
  catch (err) {
    res.json({ message: err });
  }
  //making a transporter to send otp to moderator
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD
    }
  });
  const mailOptions = {
    from: process.env.EMAIL,
    to:  req.body.mail,
    subject: 'OTP for Moderator',
    text: 'Your OTP is ' + otp + " " + "This OTP is valid for 1 day"
  };
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log("mail" + error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
}
);

// verifying otp is valid for 1 day protect kore nish
userRouter.post('/verifyOTP', async (req, res) => {
  try {
    const otp = await OTPSchema.findOne({ otp: req.body.otp });
    if (otp && otp.otpFor == req.body.mail) {
      if (otp.date.getTime() + 8.64e+7 > new Date().getTime()) {
        res.json({ message: "OTP verified" });
        otp.remove();
        const mod = await User.findOne
          ({ email: req.body.mail });
        mod.verified = true;
        await mod.save();
      }
      else {
        res.json({ message: "OTP expired" });
      }
    }
    else {
      res.json({
         message: "OTP not verified" 
        });
    }
  }
  catch (err) {
    res.json({ message: err });
  }
}
);

export default userRouter;
