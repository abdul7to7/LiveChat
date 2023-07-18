const express=require('express');
const { addMessage, getAllMessages } = require('../controllers/messageController');
const messageRouter=express.Router()


messageRouter.post('/addmsg',addMessage);
messageRouter.post('/getmsg',getAllMessages);

module.exports=messageRouter;