$(function () {
    var socket = io();
    $('form').submit(function(){
    socket.emit('chat message', $('#m').val());
    $('#m').val('');
    return false;
    });
    socket.on('chat message', function(msg){
    $('#messages').append($('<li>').text(msg));
    });
});

$(document).ready(function (){
        var name=prompt("Please enter your username");
        if (name!=null){
          alert("Username was " + name);
       }
    });