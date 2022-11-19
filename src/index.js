import app from './app.js'
import './database.js'
import {Server as websocket } from 'socket.io'
import http from 'http' //se importa el protocolo http para crear un servidor y ese se use en los websocket
import sockets from './sockets.js'
import {PORT} from './config.js'


const server = http.createServer(app) // se crea el servidor http
const httpServer = server.listen(PORT) // se le asigna el servidor que se usara a una variable 
console.log('Servidor escuchando en el puerto', PORT)

const io = new websocket(httpServer)// se asigna ese servidor que se estara ejecutando a el websocket
sockets(io)
