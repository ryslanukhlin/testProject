const express = require('express');
const app = express()
const http = require('http').Server(app);
const io = require('socket.io')(http);
const config = require('./config');

app.use(express.json());

const PORT = config.serverUri || 8000;

io.on('connection', (socket) => {
    console.log('a user connected');
});

app.listen(PORT, () => console.log(`сервер запушен на http://localhost:${PORT}`));
