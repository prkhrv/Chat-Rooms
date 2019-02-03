var express = require('express');
var app = express();
var port = process.env.PORT || 3000;
var mongoose = require('mongoose');
var Site = require('./api/models/chat_model');//created model loading here
var bodyParser = require('body-parser');
var path = require('path');
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var fs = require('fs');

var Rooms = mongoose.model('Chat');

var myRoom = '';
var rooms = {};


// SocketIO
// var http = require('http');
// var server = http.createServer(app);

// mongoose instance connection url connection
mongoose.Promise = global.Promise;
const dbConfig = require('./config/database.config.js');
// Connecting to the database
mongoose.connect(dbConfig.url, {
    useNewUrlParser: true,
    useCreateIndex:true,
}).then(() => {
    console.log("Successfully connected to the database");
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
})


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// app.use(function(req, res) {
//   res.status(404).send({url: req.originalUrl + ' not found'})
// });

const routes = require('./api/routes/chat_routes'); //importing route
app.use('/', routes) //register the route
app.get('/room/:roomId',function (req,res) {
    Rooms.findById(req.params.roomId,function (err, room) {
      if (err){
        res.send(err);}
      if(!room){
        return res.status(404).json({Allowed: false, msg: 'Room not found or Deleted'});
      }
      myRoom = req.params.roomId
      res.sendFile(__dirname + '/index.html');

    });
  });






server.listen(port, () => {
  console.log('Server listening at port %d', port);
});



// const myrooms = ["node","python"];

// Routing
// app.use(express.static(path.join(__dirname, 'public')));


// Chatroom

var numUsers = 0;




io.on('connection', (socket) => {
  rooms[socket.id] = myRoom;

  var addedUser = false;
  socket.on('subscribe',(room) => {
    console.log('joining room '+ room);
    console.log('server room: '+ myRoom);
    socket.join(room);
  });

  // when the client emits 'new message', this listens and executes
  socket.on('new message', (data) => {
    // we tell the client to execute 'new message'
    socket.in(rooms[socket.id]).emit('new message', {
      username: socket.username,
      message: data
    });
  });

  // when the client emits 'add user', this listens and executes
  socket.on('add user', (username) => {
    if (addedUser) return;

    // we store the username in the socket session for this client
    socket.username = username;
    ++numUsers;
    addedUser = true;
    io.sockets.in(rooms[socket.id]).emit('login', {
      numUsers: numUsers
    });
    // echo globally (all clients) that a person has connected
    io.sockets.in(rooms[socket.id]).emit('user joined', {
      username: socket.username,
      numUsers: numUsers
    });
  });

  // when the client emits 'typing', we broadcast it to others
  socket.on('typing', () => {
    io.sockets.in(rooms[socket.id]).emit('typing', {
      username: socket.username
    });
  });

  // when the client emits 'stop typing', we broadcast it to others
  socket.on('stop typing', () => {
    io.sockets.in(rooms[socket.id]).emit('stop typing', {
      username: socket.username
    });
  });

  // when the user disconnects.. perform this
  socket.on('disconnect', () => {
    if (addedUser) {
      --numUsers;

      // echo globally that this client has left
      io.sockets.in(rooms[socket.id]).emit('user left', {
        username: socket.username,
        numUsers: numUsers
      });
    }
  });
});



console.log(' CHAT API server started on: ' + port);
