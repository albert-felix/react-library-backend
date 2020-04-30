const express = require("express");
const User = require("../models/user");
const { generateHash, compareHash } = require("../utils/hash");
const { createToken, validateToken } = require("../utils/loginTokenManager")

const userRouter = express.Router();

userRouter
  .post("/signup", async (req, res) => {
    try {
      const user = new User(req.body);
      user.password = generateHash(user.password);
      const saveResponse = await user.save();
      console.log(saveResponse);
      res.status(200).json({ status: "SUCCESS" });
    } catch (e) {
      console.error(e);
      res.status(500).send("Internal Server Error");
    }
  })

  .post("/login", async (req, res) => {
    try{
      const { email, password } = req.body;
      const user = await User.findOne({ email }).exec();
      console.log(user);
      if (user) {
        const result = await compareHash(password, user.password);
        if (result) {
          const jwtToken = createToken({email});
          res.cookie("jwt", jwtToken);
          res.status(200).json({status: "SUCCESS", jwtToken});
        }else{
          res.status(400).send("Invalid Request");
        }
      }else{
        res.status(400).send("Invalid Request");
      }
    }catch(e){
      console.error(e);
      res.status(500).send("Internal Server Error")
    }
  });

module.exports = userRouter;
