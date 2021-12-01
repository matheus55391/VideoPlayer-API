const jwt = require('jsonwebtoken')
const config = require('@env');


exports.ValidarToken = (token) =>{
    token = jwt.verify(token, config.app.token_secret, (err, result)=>{
        if( err ) throw err
        return result
    })      
    return token
}

exports.GerarToken = (id_usuario) =>{
    return jwt.sign({ id: id_usuario }, config.app.token_secret)
}