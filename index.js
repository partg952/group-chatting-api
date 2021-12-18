const app = require("express")();
const cors = require("cors")
const server = require("http").createServer(app);
const PORT = process.env.PORT || 8080;
const socket = require("socket.io")(server,{
cors:{origin:"*"}
})


app.get("/",(req,res)=>{
	res.send("hello world")
})


socket.on("connection",data=>{
	data.on("join_room",room=>{
		data.join(room)
		console.log(`${data.id} has joined room ${room}`)
	})
	data.on("message",message=>{
		console.log(`${data.id} said ${message.text}`)
		data.broadcast.to(message.room).emit("message",{text:message.text,writer:message.userName})
	})


})

server.listen(PORT,()=>console.log("listening at port 8080"))
