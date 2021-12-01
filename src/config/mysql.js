const mysql = require('mysql') 
const config = require('@env')

const mysql_conn = {
    "user": config.mysql_conn.user,
    "password" : config.mysql_conn.password,
    "database" : config.mysql_conn.database,
    "host": config.mysql_conn.host,
    "port": config.mysql_conn.port
}


const pool = mysql.createPool(mysql_conn)

exports.query = (sql, params=[]) =>{
    return new Promise((resolve, reject)=>{
        pool.query(sql, params, (err, res)=>{
            if(err){
                return reject(err)
            }else resolve(res)
        })
    })
}
