const allSocketOps = (io) => {
  io.on('connection', socket => {
    socket.on('chatroom', function(chatroom) {
      socket.join(chatroom);
    });

    socket.on('subscribe', function(room) { 
      socket.join(room); 
  })

  socket.on('unsubscribe', function(room) {  
      socket.leave(room); 
  })

    socket.on('disconnect', () => {
      console.log('socket disconnected...', socket.id)
    });
  });
}

module.exports = {
  allSocketOps
}