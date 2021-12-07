/*
dependencies are npm packages 
 - express
 - socket.io
 
install it via npm
npm init
npm install express —save
npm install socket.io —save
*/

var DEBUG = false;
//create webserver and listen at port 3000
var express = require('express');
var app = express();
var server = app.listen(3000);
/// make all files in directory public accessible (these files are static files, index.html. js files, media)
app.use(express.static('public'));

console.log("socket server is running");

//create websocket
var socket = require('socket.io');
//add server to the socket
var io = socket(server);
//deal with events - in these case "conection" and call a function when connection is working
io.sockets.on('connection', newConnection);

function newConnection(socket) {
    console.log('new connection: ' + socket.id);

    socket.on('msg', getMsg);

    function getMsg(data) {

        if (DEBUG) {
            console.log(data);
        }

        if (data.name == 'slider1') {
            console.log(data.value);
        }
        socket.broadcast.emit('msg', data);
    }
}

