const express = require('express');
const app = express()
const http = require('http').Server(app);
const io = require('socket.io')(http);
const config = require('./config');
const authRouter = require('./router/authRouter');
const productEouter = require('./router/productRouter');
const mongoose = require('mongoose');
var cors = require('cors');

const corsOptions = {
    origin: config.frontednUri,
    optionsSuccessStatus: 200 
}

app.use(cors(corsOptions));

app.use(express.json());
app.use('/api', authRouter, productEouter);

const PORT = config.serverUri || 8000;
 
const start = async () => {
    try {
        await mongoose.connect(config.mongoUri, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        io.on('connection', (socket) => {
            console.log('a user connected');
        });
        
        app.listen(PORT, () => console.log(`сервер запушен на http://localhost:${PORT}`));
    } catch (error) {
        console.log(error);
    }
};

start();