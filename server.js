//modules
const express = require('express'),
    app = express(),
    server = require('http').createServer(app),
    socketIO = require('socket.io'),
    io = socketIO(server)

var users = []

//static files
app.use(express.static('public'))

//websocket server
io.on('connection', (socket) => {
    console.log('a new user connected:', socket.id)
    socket.on('inputMessage', (message) => {
        io.emit('chatMessage', message)
    })

    socket.on('name', (name) => {
        console.log(name, socket.id)
    })

    socket.on('disconnect', () => {
    })

})

//listen to port
server.listen(3000, () => {
    console.log('server is running on port 3000')
})