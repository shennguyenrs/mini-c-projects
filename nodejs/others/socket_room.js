const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const port = 8080;

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/socket_room_index.html');
});

server.listen(port, () => {
  console.log('Server listens on port ' + port);
});

// Rooms
var roomno = 1;
io.on('connection', socket => {
  // Increase the room-no if there are more then one client inroom
  if (
    io.nsps['/'].adapter.rooms['room-' + roomno] &&
    io.nsps['/'].adapter.rooms['room-' + roomno].length > 1
  )
    roomno++;

  socket.join(roomno);
  // Emit a message that annouce the room client is in
  io.to(roomno).emit('connectToRoom', 'You are in room ' + roomno);
});
