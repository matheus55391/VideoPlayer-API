const videoService = require('@services/videoService') 
const jwt = require('@helpers/jwt')
const arquivo = require('@helpers/arquivo')

exports.PostUploadVideo = async (req, res, next) => {
    const token = req.headers['authorization']
    
    var files = req.files;

    if(!token) return res.status(401).json({error: { auth: false, message: 'Token não encontrado.' }})
    const id_usuario = jwt.ValidarToken(token).id
    if(files.length < 2) return res.status(404).json({error: { auth: false, message: 'Arquivos não encontrado.' }})
    
    let descricao = req.query.descricao
    let titulo = req.query.titulo
    
    if(!descricao)  descricao = null 
    if(!titulo)  titulo = files[0].originalname 
    

    
    await videoService.RegistrarVideo(id_usuario, files[0].filename, files[0].mimetype, titulo, descricao, files[1].filename)

    return await res.status(200).json({
        auth: true, message: 'Sucesso!'
    })
    
}

exports.GetListaAleatoria = async (req, res, next) => {

    let result = await videoService.ListaAleatoria()
    return await res.status(200).json(result)

}

exports.GetBuscarVideosPorNome = async (req, res, next)=>{
  
    let nome = req.query.nome
    if(!nome) return res.status(404).json({error: {message:'Nome vazio.'}})

    let video = await videoService.BuscarVideosPorNome(nome)    
    return await res.status(200).json(video)

}

exports.GetBuscarVideoPorId = async (req, res, next) =>{

    let id = req.query.id
    if(!id) return res.status(404).json({error: {message:'Id não encontrado.'}})

    let video = await videoService.BuscarVideoPorId(id)    
    if(video == null) return res.status(404).json({error: {message:'Video não encontrado.'}})
    await videoService.ContarVisualizacao(id)
    video.comentarios = await videoService.buscarComentarios(video.id)
    
    return await res.status(200).json(video) 

}

exports.GetBuscarVideosPorIdCanal = async (req, res, next) =>{

    let id = req.query.id
    let result = await videoService.BuscarVideosPorIdCanal(id)
    return await res.status(200).json(result)

}

exports.GetVideo =  async (req, res, next) =>{

    const nomeArquivo = req.query.vi
    if(!nomeArquivo) return res.status(404).json({error: {message:'Video não encontrado.'}})
    if(!nomeArquivo.includes('.mp4')) return res.status(404).json({error: {message:'Erro no nome do arquivo do video.'}})
    const url = arquivo.GerarUrlAbsoluta(nomeArquivo)
    return await res.status(200).sendFile(url)
    
} 

exports.PostComentarVideo = async (req, res, next) =>{

    const token = req.headers['authorization']
    let id_video = req.body.id_video
    let comentario = req.body.comentario
    
    if(!token) return res.status(401).json({error: { auth: false, message: 'Token não encontrado.' }});
    
    if(!id_video)  return res.status(404).json({error: { auth: false, message: 'Id do video vazio.' }});
    if(!comentario) return res.status(404).json({error: { auth: false, message: 'Comentario vazio.' }});
    const id_usuario = jwt.ValidarToken(token).id
    await videoService.ComentarVideo(id_video, id_usuario, comentario)

    return await res.status(200).json({
        auth: true, message: 'Sucesso!'
    })
}

// exports.PutAtualizarThumb = async (req, res, next) =>{
//     if(arquivo.VerificaExisteThumb) console.log('deletar arquivo')
//     //TODO 

// }