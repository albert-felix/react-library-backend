const express = require("express");
const User = require("../models/user")

const userRouter = express.Router();

userRouter.post('/signup', async(req,res) => {
  
  try{
    const user = new User(req.body);
    const saveResponse = await user.save();
    console.log(saveResponse);
    res.status(200).json({status:"SUCCESS"});
  }catch(e){
    console.error(e);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = userRouter;