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
                    cb(new Error('Invalid token.'))
                }
            }
        },
        filename: (req, file, cb) => {
            crypto.randomBytes(16, (err, hash) =>{
                if(err) {
                    cb(err)
                }
                const fileName = (fileName) => {
                    if(fileName.includes('.mp4')){
                        return  `${hash.toString('hex')}` + ".mp4"
                    } else if(fileName.includes('.jpg')){
                        return  `${hash.toString('hex')}` + ".jpg"
                    } else if(fileName.includes('.png')){
                        return  `${hash.toString('hex')}` + ".png"
                    } else{
                        return cb(new Error('Formato invalido.'))
                    }
                }
                cb(null, fileName(file.originalname))
            })
        }
    }),
    limits: {
        fileSize: 500 * 1024 * 1024
    }
}