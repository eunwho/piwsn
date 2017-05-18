
// a

//--- serial port for xbee

var SerialPort = require('serialport');

var port = new SerialPort('/dev/ttyAMA0',{
    baudRate: 115200,
    parser: SerialPort.parsers.readline('\n')
});

port.on('open',function(err){    
    if(err) return console.log('Error on write : ', err.message);    
    console.log('serial open ');
}); 

//--- socket.io for sending to server fo Wireless Sensor Net 

var io = require('socket.io-client');
var socket = io.connect('http://192.168.0.119:8080', {reconnect: true});

// Add a connect listener
socket.on('connect', function (socket) {
    console.log('Connected!');
});


port.on('data',function (data){

	socket.emit('CH0', 'me', data);

    console.log('RXD  : '+data);
	
	var wsnIn = new wsnDB1({wsnData:data});
	wsnIn.save( function( err, wsnIn ){
		if(err) return console.error(err);	
	    console.log('SAVED: '+data);
	});	
});

port.on('error', function(err) {
    console.log('Error: ', err.message);
    console.log('Error Occured');
});

console.log('start');


