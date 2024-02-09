//import userVal from "./userValidation";

const express = require("express");
const { UserModel } = require("../models/UserModel");
const jwt = require("jsonwebtoken");

//Bcrypt is used for verifying the user password while he logs in.

const bcrypt = require("bcrypt");

const userRouter = express.Router();

//This function is just to check if users collection in created in the DB on the localhost

userRouter.get("/", (req, res) => {
  res.send("All the user");
});

//Adds a newly registered user data to DB

userRouter.post("/register", async (req, res) => {
  //const data = userVal(req.body);
  const { name, email, password } = req.body;
  bcrypt.hash(password, 5, async function (err, hash) {
    if (err) return res.send({ message: "somthing went wrong", status: 0 });
    try {
      let user = new UserModel({ name, email, password: hash });
      await user.save();
      res.send({
        message: "User created",
        status: 1,
      });
    } catch (error) {
      res.send({
        message: error.message,
        status: 0,
      });
    }
  });
});

//This function checks for user email in DB and verifies the respective password(using bcrypt) and then lets the user login.

userRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;
  let option ={
    expiresIn:"3h"
  }

  try {
    let data = await UserModel.find({ email });
    if (data.length > 0) {
      let token = jwt.sign({ userId: data[0]._id }, "hruthi",option);
      bcrypt.compare(password, data[0].password, function (err, result) {
        if (err)
          return res.send({ message: "Somthing went wrong:" + err, status: 0 });
        if (result) {
          res.send({
            message: "User logged in successfully",
            token: token,
            status: 1,
          });
        } else {
          res.send({
            message: "Incorrect password",
            status: 0,
          });
        }
      });
    } else {
      res.send({
        message: "User does not exist",
        status: 0,
      });
    }
  } catch (error) {
    res.send({
      message: error.message,
      status: 0,
    });
  }
});

module.exports = { userRouter };
