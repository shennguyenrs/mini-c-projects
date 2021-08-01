const express = require('express');
const app = express();
const port = 8080;

const server = require('http').createServer(app);
const io = require('socket.io')(server);

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/example_socket_index.html');
});

server.listen(port, () => {
  console.log('App is listening on port ' + port);
});

// Broadcast
var client = 0;

io.on('connection', socket => {
  client++;
  socket.emit('broadcast', {description: client + ' clients connected'});
  socket.on('disconnect', () => {
    client--;
    socket.emit('broadcast', {description: client + ' clients connected'});
  });
});

/*
// Whenever someone connect, this code will be excuted
io.on('connection', socket => {
  console.log('A client connected');

  // Send a message when timeout is 5 seconds
  setTimeout(() => {
    socket.send('You have been on site for 5 seconds');
    // Send an emit object
    socket.emit('testEvent', {description: 'A test event'});
    console.log('Client has been on site for 5 seconds');
  }, 5000);

  // When the user is diconnect from the site
  socket.on('disconnect', () => {
    console.log('A client diconnect');
  });
  // Receive event from Client
  socket.on('ClientEvent', data => {
    console.log(data);
  });
});
*/
