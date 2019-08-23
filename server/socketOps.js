const allSocketOps = (io) => {
  io.on('connection', socket => {
    console.log('connected', socket.id)
    
    socket.on('chatroom', function(chatroom) {
      console.log('chatroom', chatroom)
      socket.join(chatroom);
    });

    socket.on('disconnect', () => {
      console.log('socket disconnected...', socket.id)
    });
  });
}

module.exports = {
  allSocketOps
}