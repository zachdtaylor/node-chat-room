var express = require('express');
var app = require('express')();
var path = require('path');
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.use(express.static(path.join(__dirname, 'javascript')));

app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html');
    });

io.on('connection', function(socket){
    console.log('a user connected');
    socket.on('disconnect', function(){
        console.log('user disconnected');
      });
      socket.on('chat message', function(usr, msg){
        console.log('user: ' + usr);
        console.log('message: ' + msg);
        io.emit('chat message', usr, msg);
      });        
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});