var username = "";
var socket = io();

$(function () {
    $('form').submit(function(){
        socket.emit('chat message', username, $('#m').val());
        $('#m').val('');
        return false;
    });

    socket.on('chat message', function(usr, msg){
        $('#messages').append($('<li>').text(usr + ": " + msg));
    });

    socket.on('new user', function(usr) {
        $('#messages').append($('<li>').text(usr + " joined!"));
    });

    socket.on('user disconnect', function(usr) {
        $('#messages').append($('<li>').text(usr + " left."));
    });

    socket.on('user typing', function(usr) {
        $("#display-typing").text(usr + " is typing...");
    });
});

$(document).ready(function (){
    username = prompt("Please enter your username");
    $("#display-username").text("Username: " + username);
    socket.emit('new user', username);

    $("#m").keyup(function() {
        socket.emit('user typing', username);
    });
});