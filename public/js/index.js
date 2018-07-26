var socket = io();

socket.on('connect', function () {
    console.log('Connected to the server');
});

socket.on('disconnect', function () {
    console.log("dosconnected from the server");
});



socket.on('newMessage', function (email) {
    console.log('---- new message---');
    console.log(email);
});