var socket = io();

socket.on('connect', function () {
    console.log('Connected to the server');

    // socket.emit('createEmail', {
    //     'to': 'abc@example.com',
    //     'body': "hello world!"
    // });

    socket.emit('createMessage',{
        'from':"def@example.com",
        'text':'yo!'
    });
});

socket.on('disconnect', function () {
    console.log("dosconnected from the server");
});

// socket.on('newEmail', function (email) {
//     console.log('New email', email);
// });

socket.on('newMessage', function (email) {
    console.log('---- new message---');
    console.log(email);
});