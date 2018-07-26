var socket = io();

socket.on('connect', function () {
    console.log('Connected to the server');


});

socket.on('disconnect', function () {
    console.log("dosconnected from the server");
});



socket.on('newMessage', function (email) {
    var li = $("<li></li>");
    li.text(`${email.from}: ${email.text}`);
    $("#messages").append(li);
});

socket.on('newLatLng', function (croods) {
    var li = $("<li></li>");
li.html(`${croods.from}: Location <a href='https://www.google.com/maps?q=${croods.text}' target='_blank'>map</a>`)
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

$("#send-location").on('click', function () {

    if (!navigator.geolocation) {
        return alert("Geolocation not supported in your browser");

    }

    navigator.geolocation.getCurrentPosition(function (position) {

        socket.emit('createLocationMessage', {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        });

    }, function () {
        alert('Unable to fetch location');
    });

});