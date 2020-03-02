// function receiveOsc(address, value) {
// 	console.log("received OSC: " + address + ", " + value);
	
// 	if (address == '/test') {
// 		x = value[0];
// 		y = value[1];
// 	}
// }

// function sendOsc(address, value) {
// 	socket.emit('message', [address].concat(value));
// }

// function setupOsc(oscPortIn, oscPortOut) {
// 	var socket = io.connect('http://127.0.0.1:8000', { port: 8000, rememberTransport: false });
// 	socket.on('connect', function() {
// 		socket.emit('config', {	
// 			server: { port: oscPortIn,  host: '127.0.0.1'},
// 			client: { port: oscPortOut, host: '127.0.0.1'}
// 		});
// 	});
// 	socket.on('message', function(msg) {
// 		if (msg[0] == '#bundle') {
// 			for (var i=2; i<msg.length; i++) {
// 				receiveOsc(msg[i][0], msg[i].splice(1));
// 			}
// 		} else {
// 			receiveOsc(msg[0], msg.splice(1));
// 		}
// 	});
// }