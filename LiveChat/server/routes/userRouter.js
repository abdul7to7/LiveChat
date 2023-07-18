const express=require('express');
const { register, login, getallusers } = require('../controllers/userController');
const userRouter=express.Router()

userRouter.post('/register',register);
userRouter.post('/login',login);
userRouter.get('/getallusers/:id',getallusers);

module.exports=userRouter;