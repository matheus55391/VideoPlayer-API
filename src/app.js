require('@mysql')
const express = require('express')
const morgan = require('morgan')
const routes = require('./routes')
const cors = require('cors')
const arquivo = require('@helpers/arquivo')
const app = express()

arquivo.CriarPastasPublicas()

app.use(cors({exposedHeaders: 'authorization'}));
app.use(express.urlencoded({extended: true}))
app.use(express.json())

app.use(morgan('dev'))
app.get('/favicon.ico', (req, res) => res.status(204));
app.use('/api', routes)

app.use((req, res, next) =>{ 
    const erro = new Error('Não encontrado')
    erro.status(404)
    next(erro)
})

app.use((error, req, res, next) =>{
    res.status(error.status || 500)
    return res.json({
        erro:{
            message: error.message
        }
    })
})


module.exports = app