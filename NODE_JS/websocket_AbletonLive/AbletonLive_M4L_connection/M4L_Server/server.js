/*
dependencies are npm packages 
 - express
 - socket.io
 
install it via npm
npm init
npm install express —save
npm install socket.io —save
*/

const maxAPI = require('max-api');
const express = require('express');
const socket = require('socket.io');

var DEBUG = false;
//create webserver and listen at port 3000
var app = express();
var server = app.listen(3000);
/// make all files in directory public accessible (these files are static files, index.html. js files, media)
app.use(express.static('public'));
maxAPI.post("socket server is running");


//add server to the socket
var io = socket(server);
//deal with events - in these case "conection" and call a function when connection is working
io.sockets.on('connection', newConnection);

function newConnection(socket) {
    maxAPI.post('new connection: ' + socket.id);

    socket.on('msg', getMsg);

    function getMsg(data) {

        if (DEBUG) {
            maxAPI.post(data);
        }

        if (data.name == 'slider1') {
            maxAPI.post(data.value);
        }
        socket.broadcast.emit('msg', data);
    }
}

maxAPI.addHandler('disconnect', () => {
	server.close();
	maxAPI.post('server closed');
});


