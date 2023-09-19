var socket = io.connect('http://localhost:4000');

var message = document.getElementById('mensaje'),
      handle = document.getElementById('usuario'),
      btn = document.getElementById('enviar'),
      output = document.getElementById('output'),
      feedback = document.getElementById('feedback');


btn.addEventListener('click', function(){
    socket.emit('chat', {
        message: message.value,
        handle: handle.value
    });
    message.value = "";
});

message.addEventListener('keypress', function(){
    socket.emit('typing', handle.value);
})


socket.on('chat', function(data){
    feedback.innerHTML = '';
    output.innerHTML += '<p><strong>' + data.handle + ': </strong>' + data.message + '</p>';
});

socket.on('typing', function(data){
    feedback.innerHTML = '<p><em>' + data + ' is typing a message...</em></p>';
});
