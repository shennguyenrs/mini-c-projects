const app = require('express')();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const port = 8080;

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/socket_chat_index.html');
});

server.listen(port, () => {
  console.log('Server is listening on port ' + port);
});

var users = [];
io.on('connection', socket => {
  console.log('A user connected');

  socket.on('SetUsername', data => {
    if (users.indexOf(data) > -1) {
      socket.emit(
        'userExists',
        data + ' is existed! Please try with a new username',
      );
    } else {
      users.push(data);
      socket.emit('userSet', {username: data});
      console.log('created ' + data);
    }
  });

  socket.on('SendMsg', data => {
    io.sockets.emit('newmsg', data);
  });
});
