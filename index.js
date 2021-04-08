const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const io = require('socket.io')(server);

app.get('/', (req, res) => {
  //res.send('<h1>Hello world</h1>');
  res.sendFile(__dirname + '/index.html');
});



  io.on('connection', (socket) => {
    socket.on('chat message', (msg) => {
      io.emit('chat message', msg);
    });

   
  });

  io.on('typing', (data)=>{
    if(data.typing==true)
       io.emit('display', data)
    else
       io.emit('display', data)
  })

  io.on('display', (data)=>{
    if(data.typing==true)
      $('.typing').text(`${data.user} is typing...`)
    else
      $('.typing').text("")
  })

  
server.listen(3000, () => {
  console.log('listening on *:3000');
});