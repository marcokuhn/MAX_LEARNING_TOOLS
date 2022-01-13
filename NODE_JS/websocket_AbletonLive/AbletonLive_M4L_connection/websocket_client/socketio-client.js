// include max-api -> is the connection to Max
const maxAPI = require('max-api');
const io = require('socket.io-client');

maxAPI.post("Hello from Node.js");

let socket;

// create a connection handler 
// parameter = url
// socket will be connected to the url
maxAPI.addHandler('connect', (url) => {
    socket = io(url);

    socket.on('msg', getMsg);


	
    function getMsg(data) {
        if (data.name == 'slider1') {
            maxAPI.outlet('slider1', data.value);
        }
    }
	
	// ToDo: Add function for receiving button and xyPAD

});

maxAPI.addHandler('disconnect', () => {
    socket.close();
});



