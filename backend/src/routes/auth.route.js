import express from "express";
import passport from "passport";
import axios from "axios";
import User from "../models/user.model.js";
import tokenGenerator from "../utils/tokenGenerator.js";

const router = express.Router();

//auth user with google
router.get(
  "/google/callback",
  passport.authenticate("google", {
    successRedirect: process.env.CLIENT_URL,
    failureRedirect: `${process.env.CLIENT_URL}/login/failed`,
  })
);

//forward auth req to google auth server
router.get("/google", async (req, res) => {
  try {
    const response = await axios.get(
      "https://accounts.google.com/o/oauth2/v2/auth",
      {
        params: req.query,
      }
    );
    console.log(response);
    res.send(response);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//register or login user to database
router.get("/login/success", async (req, res) => {
  if (req.user) {
    const isUserExists = await User.findOne({ email: req.user._json.email });
    let newUser;
    if (!isUserExists) {
      newUser = new User({
        name: req.user._json.name,
        email: req.user._json.email,
        password: Date.now(),
      });
      await newUser.save();
    }
    tokenGenerator(res, isUserExists ? isUserExists._id : newUser._id);
    res.status(200).json({
      user: {
        ...req.user,
        isAdmin: isUserExists ? isUserExists.isAdmin : false,
        message: "Successfully Logged In",
        _id: isUserExists ? isUserExists._id : newUser._id,
      },
    });
  } else {
    res.status(403).json({
      message: "Not Authorized",
    });
  }
});

//login failed
router.get("/login/failed", (req, res) => {
  res.status(401);
  throw new Error("Failed to Log In");
});

//logout
router.get("/logout", (req, res) => {
  req.logout((err) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ error: "Failed to log out" });
    }
    req.session.destroy((err) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ error: "Failed to destroy session" });
      }
      res.redirect("/");
    });
  });
});

export default router;
