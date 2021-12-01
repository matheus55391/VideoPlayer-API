const multer = require('multer')
const path = require('path')
const crypto = require('crypto')
const jwt = require('@helpers/jwt') 

module.exports = {
    dest: path.resolve(__dirname, '..', '..', 'public','videos'),

    fileFilter: (req, file, cb) => {      
        const allowedMines = ['video/mp4',]

        if(allowedMines.includes(file.mimetype)) {
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
                    cb(null, path.resolve(__dirname, '..', '..', 'public','videos'))
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
                const fileName = `${hash.toString('hex')}` + ".mp4"
                cb(null, fileName)
            })
        }
    }),
    limits: {
        fileSize: 500 * 1024 * 1024
    }
}