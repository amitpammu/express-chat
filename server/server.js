const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io')
const { generateMessage } = require('./utils/message');

const publicPath = path.join(__dirname, '../public');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);
const port = process.env.PORT || 3000;
app.use(express.static(publicPath));

io.on('connection', (socket) => {
    console.log("New user connected");

    // disconnect
    socket.on('disconnect', (socket) => {
        console.log("User disconnected");
    });

    socket.emit('newMessage', generateMessage('Admin', 'Welcome to chat room'));

    socket.broadcast.emit('newMessage', generateMessage('Admin', 'Guys! We have a new user'));

    //emit new message event
    socket.on('createMessage', (msg,callback) => {

        io.emit('newMessage', {
            'from': msg.from,
            'text': msg.text,
            'createdAt': new Date().toDateString()     
           });
        callback('From the server');
    });

    socket.on('createLocationMessage',(coords)=>{
        io.emit('newLatLng',generateMessage('Admin',`${coords.latitude},${coords.longitude}`))
    });
});

//server
server.listen(port, (err, res) => {
    console.log(`running port on ${port}`);
});