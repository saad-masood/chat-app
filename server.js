const io = require('socket.io')(3000)
const users = {}
io.on('connection', socket => {
    socket.on('new-user', user_name=>{
        users[socket.id] = user_name
        socket.broadcast.emit('user-connected', user_name)
    })
    socket.on('send-chat-message', message =>{
         socket.broadcast.emit('chat-message', {message: message, name: users[socket.id]})
     })

    socket.on('disconnect', ()=>{
        socket.broadcast.emit('user-disconnected', users[socket.id])

       delete users[socket.id]
    })
})