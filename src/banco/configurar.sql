--Pasta de configuração do mysql

create database videoplayer

CREATE TABLE IF NOT EXISTS videoplayer.user  (
  id_user  INT NOT NULL AUTO_INCREMENT,
  username  VARCHAR(50) NOT NULL,
  password  VARCHAR(100) NOT NULL,
  flAtivo  INT NOT NULL DEFAULT 1,
  PRIMARY KEY( id_user ),
  UNIQUE( username )
)

CREATE TABLE IF NOT EXISTS  videoplayer.video  (
  id_video  INT NOT NULL AUTO_INCREMENT,
  id_usuario  INT NOT NULL,
  file_nome  VARCHAR(255) NOT NULL,
  file_tipo  VARCHAR(50) NOT NULL,
  video_nome  VARCHAR(100) NOT NULL,
  visualizacoes  INT NOT NULL DEFAULT 0,
  descricao VARCHAR(500) NULL,
  PRIMARY KEY ( id_video ),
  UNIQUE INDEX  id_video_UNIQUE  ( id_video  ASC) VISIBLE,
  UNIQUE INDEX  file_nome_UNIQUE  ( file_nome  ASC) VISIBLE
)

CREATE TABLE IF NOT EXISTS videoplayer.comentario (
    id_comentario  INT NOT NULL AUTO_INCREMENT,
    id_video INT NOT NULL,
    id_usuario INT NOT NULL,
    comentario VARCHAR(255),
    datahora DATETIME,
    PRIMARY KEY( id_comentario )

)