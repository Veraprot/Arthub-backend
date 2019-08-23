const allSocketOps = (io) => {
  io.on('connection', socket => {
    console.log('connected', socket.id)

    socket.on('chatroom', function(chatroom) {
      console.log('chatroom', chatroom)
      socket.join(chatroom);
    });

    socket.on('subscribe', function(room) { 
      console.log('joining room', room);
      socket.join(room); 
  })

  socket.on('unsubscribe', function(room) {  
      console.log('leaving room', room);
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