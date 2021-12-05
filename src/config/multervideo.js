const multer = require('multer')
const path = require('path')
const crypto = require('crypto')
const jwt = require('@helpers/jwt') 

module.exports = {
    dest: path.resolve(__dirname, '..', '..', 'public','videos'),

    fileFilter: (req, file, cb) => {      
        const formatos = ['video/mp4','image/jpeg', 'image/png']

        if(formatos.includes(file.mimetype)) {
            let token = req.headers['authorization']  
            try{
                token = jwt.ValidarToken(token)
                cb(null, true)
            } catch(err){
                cb(new Error('Invalid token.'))
            }               
            
        } else {
            cb(new Error('Invalid file type.'))
        }
    },
    storage: multer.diskStorage({
        destination: (req, file, cb) =>{
            let token = req.headers['authorization']
            if(token){

                try{
                    token = jwt.ValidarToken(token)
                    
                    if(file.originalname.includes('.mp4')){
                        cb(null, path.resolve(__dirname, '..', '..', 'public','videos'))
                    } else{
                        cb(null, path.resolve(__dirname, '..', '..', 'public','thumbs'))
                    }


                } catch(err){
                    cb(new Error('Token inválido.'))
                }
            }
        },
        filename: (req, file, cb) => {
            crypto.randomBytes(16, (err, hash) =>{
                if(err) {
                    cb(err)
                }
                const gerarNomeHex = (mimetype) => {

                    if(mimetype.includes('video/mp4')){
                        return  `${hash.toString('hex')}` + ".mp4"
                    } else if(mimetype.includes('image/jpeg')){
                        return  `${hash.toString('hex')}` + ".jpg"
                    } else if(mimetype.includes('image/png')){
                        return  `${hash.toString('hex')}` + ".png"
                    } else{
                        return cb(new Error('Formato inválido.'))
                    }
                }
                cb(null, gerarNomeHex(file.mimetype))
            })
        }
    }),
    limits: {
        fileSize: 500 * 1024 * 1024
    }
}