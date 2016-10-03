// ----------- Server configuration and parameters -----------
var SERVER_ADDR = location.host;
var client_info = { mode: 'web', ip: '' };

// ---- Create a new socket connection ----
var socket = io.connect("http://" + SERVER_ADDR);
socket.on('connect', function () {
    socket.emit('login', { mode: client_info.mode });
    console.log("Connected as a " + client_info.mode);
});

// ---- Socket events send from the server ----
socket.on('set ip', function (data) {
    client_info.ip = data.ip;
    console.log("Connected through IP: " + client_info.ip);
});

socket.on('disconnect', function () {
    console.log("Server " + SERVER_ADDR + " shutdown, waiting for a new connection...");
});

window.addEventListener("beforeunload", function (e) {
    socket.emit('leave', client_info);
});
