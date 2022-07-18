require('dotenv').config()
require('module-alias/register')
const http = require('http')
const config = require('@env')
const app = require('@app')
const port = config.app.port
const host = config.app.host
const server = http.createServer(app)

server.listen(port, ()=>{
    console.log(`Servidor inicializado -> ${host}:${port}/api`)
})
