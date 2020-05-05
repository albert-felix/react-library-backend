const express = require("express");
const User = require("../models/user");
const Book = require("../models/book");
const { generateHash, compareHash } = require("../utils/hash");
const { createToken, validateToken } = require("../utils/loginTokenManager");

const userRouter = express.Router();

userRouter
  .post("/signup", async (req, res) => {
    try {
      const user = new User(req.body);
      user.password = generateHash(user.password);
      await user.save();
      const email = user.email
      const jwtToken = createToken({email})
      console.log(jwtToken)
      res.cookie("jwt", jwtToken);
      res.status(200).json({ status: "SUCCESS", jwtToken });
    } catch (e) {
      console.error(e);
      res.status(500).send("Internal Server Error");
    }
  })

  .post("/login", async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email }).exec();
      if (user) {
        const result = await compareHash(password, user.password);
        if (result) {
          const jwtToken = createToken({ email });
          res.cookie("jwt", jwtToken);
          res.status(200).json({ status: "SUCCESS", jwtToken });
        } else {
          res.status(400).send("Invalid Request");
        }
      } else {
        res.status(400).send("Invalid Request");
      }
    } catch (e) {
      console.error(e);
      res.status(500).send("Internal Server Error");
    }
  })

  .post("/addToCart", async (req, res) => {
    try {
      const {id, currentUser : email} = req.body;
      const book = await Book.findOne({_id: id}).exec();
      const user = await User.findOne({email:email}).exec();
      if (book.copies > 0){
        if(user.booksBorrowed.includes(book.title)){
          res.status(200).json({status:"IN_CART"});
        } else {
          await Book.updateOne(
            { _id: id },
            { $inc: { copies: -1 } }
          ).exec();
          await User.updateOne(
            {email:email},
            { $addToSet: { booksBorrowed: book.title }}
          ).exec();
          res.status(200).json({ status: "SUCCESS" });
        }
      }
       else {
        res.status(200).json({status: "FAIL"})
      }
    } catch (e) {
      console.error(e);
      res.status(500).send("Internal Server Error");
    }
  })
  .post("/cart", async (req,res) => {
    try{
      const email = req.body.currentUser;
      const user = await User.findOne({email: email}).exec();
      const books = user.booksBorrowed
      res.status(200).json({books})
    } catch (e) {
      console.error(e);
      res.status(500).send("Internal Server Error")
    }
  })
  .post("/removeFromCart", async (req,res) => {
    const email = req.body.currentUser;
    const user = await User.findOne({email: email}).exec();
  });

module.exports = userRouter;
