const express = require("express");
const http = require("http");
const path = require("path");
const { Socket } = require("socket.io");
const socketio = require("socket.io")

const PORT = 3000;
const app = express();

const server = http.createServer(app);
const io = socketio(server);

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname,"public")));

io.on("connection",function (socket){
    console.log("user connected with socket.id: ", socket.id);
    socket.on("send-location", (data)=>{
        io.emit("receive-location",{id:socket.id, ...data});
    })

    socket.on("disconnect",()=>{
        console.log(`User ${socket.id} has disconnected`);
        io.emit("user-disconnected",socket.id);
    })
})

app.get("/",(req,res)=>{
    // res.send("hey");
    res.render("index");
})

server.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
})