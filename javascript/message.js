var username = "";

$(function () {
    var socket = io();
    $('form').submit(function(){
        socket.emit('chat message', username, $('#m').val());
        $('#m').val('');
        return false;
    });
    socket.on('chat message', function(usr, msg){
        $('#messages').append($('<li>').text(usr + ": " + msg));
    });
});

$(document).ready(function (){
    username = prompt("Please enter your username");
    $("#display-username").text("Username: " + username);
});