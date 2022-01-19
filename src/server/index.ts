import app from './app';
const { PORT, HOST } = require('../config/index.js')

const server = require('http').createServer(app())

server.listen( PORT, HOST, () => console.log(`Server listening on port ${PORT} at  ${HOST}`))
