var express = require('express');
var app = require('express')();
var path = require('path');
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.use(express.static(path.join(__dirname, 'javascript')));

app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html');
});

var clients = [];
var client_names = [];

io.on('connection', function(socket){
    console.log('a user connected');
    socket.on('new user', function(usr) {
      clients.push(socket);
      client_names.push(usr);
      io.emit('new user', usr);
    });
    socket.on('disconnect', function(){
      var k = clients.indexOf(socket);
      name = client_names[k];
      console.log('user ' + name + ' disconnected');
      clients.splice(k, 1);
      client_names.splice(k, 1);
      io.emit('user disconnect', name);
    });
    socket.on('chat message', function(usr, msg){
      console.log('user: ' + usr);
      console.log('message: ' + msg);
      io.emit('chat message', usr, msg);
    });
    socket.on('user typing', function(usr) {
      io.emit('user typing', usr);
    });
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});