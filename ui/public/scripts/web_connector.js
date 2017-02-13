window.addEventListener("onload", function (e) {
    socket.emit('check login', client_info);
});