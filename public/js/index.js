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
    var li = $("<li></li>");
    li.text(`${email.from}: ${email.text}`);
    $("#messages").append(li);
});

$("#message-form").on('submit', function (e) {
    e.preventDefault();
    socket.emit('createMessage', {
        from: "User",
        text: $("[name=message]").val()
    }, function (data) {
        console.log('Got It: ', data);
    });
});