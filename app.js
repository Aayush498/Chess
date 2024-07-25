const express = require("express");
const socket = require("socket.io");
const http = require("http");
const { Chess } = require("chess.js");
const path = require("path");

const app = express();

const server = http.createServer(app);
const io = socket(server);

const chess = new Chess();
let players = {};
let currentPlayer = "W";

app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
    res.render("index", { title: "Custom Chess Game" });
})

io.on("connection", function(uniquesocket){
    console.log("connected");

   if(!players.white){
        players.white = uniquesocket.id;
        uniquesocket.emit("playerRole", "w");
   }
   else if(!players.black){
        players.black = uniquesocket.id;
        uniquesocket.emit("playerRole", "b")
   }
   else{
        niquesocket.emit("spectatorRole");
   }

   socket.on("disconnect", function(){
     
   });
})

server.listen(3000, ()=>{
    console.log("Server running at localhost: 3000");
})