const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const { Socket } = require('./socket/socket');

const port = 3000;
const app = express();
const server = http.createServer(app);
const io = socketIO(server);
const socket = new Socket(io);

socket.initialize();

server.listen(port, () => {
    console.log(`Server is up on port ${port}`);
});