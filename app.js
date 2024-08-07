const express = require("express");
const http2 = require("http2");
const path = require("path");
const { Socket } = require("socket.io");
const socketio = require("socket.io")

const PORT = 3000;
const app = express();

const server = http2.createServer(app);
const io = socketio(server);

app.set("view engine", "ejs");
app.set(express.static(path.join(__dirname,"public")));

app.get("/",(req,res)=>{
    return res.send("Hey");
})

server.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
})