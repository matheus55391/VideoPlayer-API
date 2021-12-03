const mysql = require('@mysql')
const config = require('@env')
const path = require('path')


exports.RegistrarVideo = async (id_usuario, file_nome, file_tipo, titulo, descricao) =>{
    
    const SQL = `INSERT INTO videoplayer.video (id_usuario, file_nome, file_tipo, video_nome, descricao) VALUES ('${id_usuario}', '${file_nome}', '${file_tipo}', '${titulo}', '${descricao}')`
    return await mysql.query(SQL)

}

exports.ListaAleatoria = async () =>{

    const SQL = `SELECT 
                    vi.id_video AS idVideo, 
                    vi.video_nome AS nomeVideo,
                    vi.file_nome AS nomeArquivo,
                    us.id_usuario AS idAutor, 
                    us.nome AS nomeAutor    
                FROM videoplayer.video AS vi
                    INNER JOIN videoplayer.usuario AS us ON (vi.id_usuario = us.id_usuario)
                ORDER BY RAND()
                LIMIT 16`
    
    let result = await mysql.query(SQL)
    let arrayVideos = []
    if(result == null) return await null

    result.map((video)=>{      
        arrayVideos.push({
            id: video.idVideo,
            titulo: video.nomeVideo,
            thumb:  `${config.app.host}${config.app.port}/api/thumb/?vi=${video.nomeArquivo.replace('.mp4', '.jpg')}`,
            autor:{
                idAutor: video.idAutor,
                nomeAutor: video.nomeAutor
            }
        })
    })  

    return await arrayVideos
}

exports.BuscarVideosPorIdCanal = async (id) =>{
    const SQL = `SELECT 
                    vi.id_video AS idVideo, 
                    vi.video_nome AS nomeVideo,
                    vi.file_nome AS nomeArquivo,
                    us.id_usuario AS idAutor, 
                    us.nome AS nomeAutor    
                FROM videoplayer.video AS vi
                    INNER JOIN videoplayer.usuario AS us ON (vi.id_usuario = us.id_usuario)
                WHERE 
                    vi.id_usuario = ${id}`

    let result = await mysql.query(SQL)  
    let arrayVideos = []
    if(result[0] == null) return await result

    result.map((video)=>{      
        arrayVideos.push({
            id: video.idVideo,
            titulo: video.nomeVideo,
            thumb:  `${config.app.host}${config.app.port}/api/thumb/?vi=${video.nomeArquivo.replace('.mp4', '.jpg')}`,
            autor:{
                idAutor: video.idAutor,
                nomeAutor: video.nomeAutor
            }
        })
    })  

    return await arrayVideos
}

exports.BuscarVideosPorNome = async (nome)=>{
    const SQL = `SELECT 
                    vi.id_video AS idVideo, 
                    vi.video_nome AS nomeVideo,
                    vi.file_nome AS nomeArquivo,
                    vi.descricao AS descricao,
                    us.id_usuario AS idAutor, 
                    us.nome AS nomeAutor    
                FROM videoplayer.video AS vi
                    INNER JOIN videoplayer.usuario AS us ON (vi.id_usuario = us.id_usuario)
                WHERE 
                    vi.video_nome LIKE '%${nome}%'`

    let result = await mysql.query(SQL)  
    let arrayVideos = []
    if(result[0] == null) return await result

    result.map((video)=>{      
        arrayVideos.push({
            id: video.idVideo,
            titulo: video.nomeVideo,
            thumb:  `${config.app.host}${config.app.port}/api/thumb/?vi=${video.nomeArquivo.replace('.mp4', '.jpg')}`,
            descricao: video.descricao,
            autor:{
                idAutor: video.idAutor,
                nomeAutor: video.nomeAutor
            }
        })
    })  

    return await arrayVideos
}

exports.BuscarVideoPorId = async (id) => {
    const SQL = `SELECT 
                    vi.id_video AS idVideo, 
                    vi.video_nome AS nomeVideo,
                    vi.file_nome AS nomeArquivo,
                    vi.descricao AS descricao,
                    vi.visualizacoes AS visualizacoes,
                    us.id_usuario AS idAutor, 
                    us.nome AS nomeAutor    
                FROM videoplayer.video AS vi
                    INNER JOIN videoplayer.usuario AS us ON (vi.id_usuario = us.id_usuario)
                WHERE
                    vi.id_video = ${id}`
    
    let result = await mysql.query(SQL)    
    result = result[0]
    if (result == null) return await null
    let video = {
        id: result.idVideo,
        titulo: result.nomeVideo,
        thumb: `${config.app.host}${config.app.port}/api/thumb/?tb=${result.nomeArquivo.replace('.mp4', '.jpg')}`,
        URL:   `${config.app.host}${config.app.port}/api/video/?vi=${result.nomeArquivo}`,
        visualizacoes: result.visualizacoes,
        descricao: result.descricao,
        comentarios: [],
        autor:{
            idAutor: result.idAutor,
            nomeAutor: result.nomeAutor
        }
    }
    return await video

}

exports.buscarComentarios = async (idVideo)=>{
    const SQL = `SELECT 
                    co.id_comentario AS id, 
                    co.datahora, 
                    co.comentario,
                    us.id_usuario AS idAutor, 
                    us.nome AS nomeAutor  
                FROM 
                    videoplayer.comentario AS co
                INNER JOIN 
                    videoplayer.usuario AS us ON co.id_usuario = us.id_usuario
                INNER JOIN 
                    videoplayer.video AS vi ON co.id_video = vi.id_video
                WHERE 
                    co.id_video = ${idVideo}
                ORDER BY co.datahora DESC`
    result = await mysql.query(SQL)
    return await result
}

exports.ComentarVideo = async (id_video, id_usuario, comentario) => {
    const SQL = `INSERT INTO videoplayer.comentario (id_video, id_usuario, comentario, datahora)
                VALUES (${id_video}, ${id_usuario}, '${comentario}', NOW())`
    result = await mysql.query(SQL)
    return await result
}

exports.ContarVisualizacao = async (id_video) =>{
    const SQL = `UPDATE videoplayer.video SET visualizacoes = visualizacoes + 1 WHERE id_video = ${id_video}`
    return await mysql.query(SQL)    
}