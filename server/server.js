const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io')

const publicPath = path.join(__dirname, '../public');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);
const port = process.env.PORT || 3000;
app.use(express.static(publicPath));

io.on('connection', (socket) => {
    console.log("New user connected");
    socket.on('disconnect', (socket) => {
        console.log("User disconnected");
    });
});




server.listen(port, (err, res) => {
    console.log(`running port on ${port}`);
});