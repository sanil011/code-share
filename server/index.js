const express = require('express');
const app = express();
const http = require("http");
const cors = require("cors");
const { Server } = require('socket.io');

app.use(cors());
console.log("asdfghjkl")
// create server
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
})


const getAllConnectedClients = (id) => {
    return Array.from(io.sockets.adapter.rooms.get(id) || []).map((socketId) => {
        return {
            socketId,
            username: userSocketMap[socketId]
        }
    })
}

const userSocketMap = {};
const doubts = [];


io.on("connection", (socket) => {
 
    socket.on("join_room", ({room, username}) => {
        userSocketMap[socket.id] = username
        socket.join(room);
        const clients = getAllConnectedClients(room);
        clients.forEach(({ socketId }) => {
            io.to(socketId).emit("new_joined", {
                clients,
                username,
                socketId: socket.id
            });
        })
        console.log(clients)
    })

    socket.on("doubt", ({ room, username, doubt }) => {
        doubts.push({name : username,msg:doubt});
        console.log(doubts);
        const clients = getAllConnectedClients(room);
        clients.forEach(({ socketId }) => {
            io.to(socketId).emit("doubt_message", {
                doubts,
                username,
                socketId: socket.id
            });
        })
    })

    socket.on("send_message", (data) => {
        socket.to(data.room).emit("recieve_message", data);
    })

    socket.on('disconnecting', () => {
        const rooms = [...socket.rooms];
        rooms.forEach((roomId) => {
            socket.in(roomId).emit("someone_disconnect", {
                socketId: socket.id,
                username: userSocketMap[socket.id]
            });
        })
        delete userSocketMap[socket.id];
        socket.leave();
    })

})

server.listen(3001, () => (
    console.log("server started")
))