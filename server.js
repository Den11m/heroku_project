const http = require('http');
const app = require('./app');
const mongoose = require('mongoose');
const keys = require('./config/keys');

mongoose.connect(keys.mongodb.dbURL);

const server = http.createServer(app);
server.listen(keys.PORT, ()=>{
    console.log(`Server started successfully at port ${keys.PORT}`)
});