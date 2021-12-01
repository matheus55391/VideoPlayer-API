module.exports = {
    app: {
        host: process.env.HOST || 'http://localhost:',
        port: process.env.PORT || 3000,
        token_secret: process.env.TOKEN_SECRET || '19216801',

    }, mysql_conn :{
        user: process.env.MYSQL_USER || "root", 
        password: process.env.MYSQL_PASSWORD || "12345",
        database: process.env.MYSQL_DATABASE || "videoplayer",
        host: process.env.MYSQL_HOST || "127.0.0.1",
        port: process.env.MYSQL_PORT || 3306
    }
}