const express=require('express')
const cors=require('cors')
const mongoose=require('mongoose')
const dotenv=require('dotenv')
const userRouter = require('./routes/userRouter')
const messageRouter = require('./routes/messageRouter')
const socket=require('socket.io')

const app=express()

dotenv.config()

app.use(cors())
app.use(express.json())

mongoose.connect(process.env.MONGO_URL,{
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then(
    console.log("DB Connected Successfully")
).catch(err=>{
    console.log(`${err}`)
}) 

app.use("/api/auth",userRouter);
app.use("/api/messages",messageRouter);

const server=app.listen(process.env.PORT,()=>{
    console.log(`server started on port ${process.env.PORT}`)
})

const io=socket(server,{
    cors:{
        origin:"http://localhost:3000",
        credentials: true,
    },
})

global.onlineUsers = new Map()

io.on("connection",(socket)=>{
    global.chatSocket = socket;
    socket.on("add-user",(userId)=>{
        onlineUsers.set(userId,socket.id)
    })

    socket.on("send-msg",(data)=>{
        const sendUserSocket = onlineUsers.get(data.to)
        if(sendUserSocket){
            socket.to(sendUserSocket).emit("msg-recieve",data.message)
        }
    })
})