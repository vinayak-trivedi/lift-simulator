const express = require('express')
const app = express()
const http = require('http')
const server = http.createServer(app)
const { Server } = require('socket.io')
const io = new Server(server, {
    cors: {
      origins: ['http://127.0.0.1:5500/']
    }
  });

let floors = 4;

io.on('connection',(socket) => {
    console.log('A user connected')
    socket.on('addfloor', () => {
        io.emit('addfloor', ++floors)
    })
    socket.on('removefloor',() => {
        io.emit('removefloor', --floors)
    })
    socket.on('addlift', () => {
        io.emit('addlift')
    })
    socket.on('removelift', () => {
        io.emit('removelift')
    })
    socket.on('called', called)
})

const called = (calledOn) => {
    io.emit('move', calledOn)
}

server.listen(3000)