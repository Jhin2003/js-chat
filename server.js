//modules
const express = require('express'),
    app = express(),
    server = require('http').createServer(app),
    socketIO = require('socket.io'),
    io = socketIO(server)

var users = {};

//static files
app.use(express.static('public'))


//websocket server
io.on('connection', (socket) => {

    console.log(users)
    socket.on('inputMessage', (message) => {
        io.emit('chatMessage', message)
    })
    socket.on('name', (name) => {
        users[socket.id] = name;
        io.emit('users', users)

        socket.on('disconnecting', () => {
            delete users[socket.id];
            io.emit('users', users)
        })

    })
})

server.listen(3000, () => {
    console.log('server is running on port 3000')
})
