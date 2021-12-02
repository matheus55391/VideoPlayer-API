const mysql = require('@mysql')

exports.BuscarUsuarioPeloNome = async (nome) =>{
    
    const SQL = `SELECT id_usuario, nome FROM videoplayer.usuario WHERE nome = '${nome}'`
    const result =  await mysql.query(SQL)
    return await result
    
}

exports.BuscarUsuarioPeloID = async (id) =>{
    
    const SQL = `SELECT id_usuario, nome FROM videoplayer.usuario WHERE id_usuario = '${id}'`
    const result =  await mysql.query(SQL)
    return await result[0]
    
}

exports.Login = async (usuario) =>{

    const SQL = `SELECT id_usuario FROM videoplayer.usuario WHERE nome = '${usuario.nome}' AND senha = '${usuario.senha}' `
    return await mysql.query(SQL)
    
}

exports.Cadastrar = async (usuario) =>{
    
    const SQL = `INSERT INTO videoplayer.usuario (nome, senha) VALUES ('${usuario.nome}', '${usuario.senha}')`
    return await mysql.query(SQL)
        
}