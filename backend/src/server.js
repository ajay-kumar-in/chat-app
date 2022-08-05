const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const socketio = require('socket.io');
const cors = require("cors");
app.use(cors())
const io = socketio(server, {
    cors: {
        origin: "http://localhost:4200",
        methods: ["GET", "POST", "PUT", "DELETE", "PATCH"]
    }
});

require('dotenv').config();
const mongoose = require('mongoose');
const bodyParesr = require('body-parser');
app.use(bodyParesr.json());

mongoose.connect('mongodb://localhost:27017/chat', { useNewUrlParser: true, useUnifiedTopology: true, })
    .then(() => {
        console.log('Connected to DB');
    })
    .catch(() => {
        console.log('Failed to connect DB');
    })

const port = process.env.PORT || 3000;

io.on("connection", (socket) => {
    console.log('Connected to new socket', socket.id);

    socket.on('join-one-to-one-chat', (roomName, cb) => {
        socket.join(roomName);
        socket.on('one-to-one-message', (data, cb) => {
            console.log(data);
            io.to(roomName).emit('one-to-one-message', data)
            cb();
        })

        socket.on('typing', (data)=> {
            socket.broadcast.to(roomName).emit('typing', data);
        })

        socket.on('notTyping', (data)=> {
            socket.broadcast.to(roomName).emit('notTyping', data);
        })
    })

    socket.on('disconnect', () => {
        console.log('User disconnected !')
    })

})

const userRouts = require("./app/routes/userRoute");
app.use("/api", userRouts);

server.listen(port, (req, res, next) => {
    console.log(`Server is up on port ${port}!`)
})