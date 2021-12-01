const mysql = require('@mysql')

exports.BuscarUsuarioPeloNome = async (nome) =>{
    
    const SQL = `SELECT id_user, username, flAtivo FROM videoplayer.user WHERE username = '${nome}'`
    const result =  await mysql.query(SQL)
    return await result
    
}

exports.BuscarUsuarioPeloID = async (id) =>{
    
    const SQL = `SELECT id_user, username, flAtivo FROM videoplayer.user WHERE id_user = '${id}'`
    const result =  await mysql.query(SQL)
    return await result[0]
    
}

exports.Login = async (usuario) =>{

    const SQL = `SELECT id_user FROM videoplayer.user WHERE username = '${usuario.username}' AND password = '${usuario.password}' `
    return await mysql.query(SQL)
    
}

exports.Cadastrar = async (usuario) =>{
    
    const SQL = `INSERT INTO videoplayer.user (username, password) VALUES ('${usuario.username}', '${usuario.password}')`
    return await mysql.query(SQL)
        
}