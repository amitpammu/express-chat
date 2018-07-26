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

    // emit new email
    // socket.emit('newEmail', {
    //     'from': "abc@example.com",
    //     'msg': "Hi, how are you?",
    //     'createdAt': "01-25-2018"
    // });

    // listen create email

    // socket.on('createEmail', (createEmail) => {
    //     console.log('createEmail', createEmail);
    // });

    // disconnect
    socket.on('disconnect', (socket) => {
        console.log("User disconnected");
    });

    //emit new message event
   

    socket.on('createMessage',(msg)=>{
        // console.log('=== create message ===');
        // console.log(msg);

        io.emit('newMessage', {
            'from': msg.from,
            'text': msg.text,
            'createdAt': new Date().toDateString()
        });
    });
});




server.listen(port, (err, res) => {
    console.log(`running port on ${port}`);
});