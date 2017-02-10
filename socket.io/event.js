// --------------- Generic function -----------------
var utils = require(process.env.NODE_PATH + '/utils.js');

// --------------- Hashmap initialize ---------------
var HashMap = require('hashmap');

// Socket.io server listens to our app
module.exports = function (io) {
    var client_socket_info = new HashMap();

    io.on('connection', function (socket) {
        //var socketId = socket.id;
        var clientIp = socket.request.socket._peername.address;
        var clientPort = socket.request.socket._peername.port;
        console.log(utils.printLogTime() + ' New connection from IP: ' + clientIp + " Port: " + clientPort);

        socket.on('login', function (data) {
            console.log(utils.printLogTime() + " Client login as a: " + data.mode);
            socket.emit('set ip', { ip: clientIp });

            // Grap socket id to it's role
            switch (data.mode) {
                case 'web':
                    client_socket_info.set(socket.id, {
                        client_ip: clientIp,
                        client_port: clientPort,
                        login: 'yes'
                    });
                    break;
                default:
                    console.log(utils.printLogTime() + " Unknow role " + data.mode);
                    break;
            }
        });

        socket.on('check login', function (client_info) {
            var login_info = {
                user: 'dev',
                status: 'permitted'
            };
        });

        socket.on('leave', function (client_info) {
            console.log(utils.printLogTime() + " Disconnecting from " + client_info.mode + " IP: " + client_info.ip);
        });

    });
}