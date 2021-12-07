create database videoplayer;

CREATE TABLE IF NOT EXISTS videoplayer.usuario  (
  id_usuario  INT NOT NULL AUTO_INCREMENT,
  nome  VARCHAR(50) NOT NULL,
  senha  VARCHAR(100) NOT NULL,
  PRIMARY KEY( id_usuario ),
  UNIQUE( nome )
);

CREATE TABLE IF NOT EXISTS  videoplayer.video  (
  id_video  INT NOT NULL AUTO_INCREMENT,
  id_usuario  INT NOT NULL,
  file_nome  VARCHAR(255) NOT NULL,
  file_tipo  VARCHAR(50) NOT NULL,
  video_nome  VARCHAR(100) NOT NULL,
  visualizacoes  INT NOT NULL DEFAULT 0,
  descricao VARCHAR(500) NULL,
  thumb VARCHAR(500) NULL,
  PRIMARY KEY ( id_video ),
  UNIQUE INDEX  id_video_UNIQUE  ( id_video  ASC) VISIBLE,
  UNIQUE INDEX  file_nome_UNIQUE  ( file_nome  ASC) VISIBLE
);

CREATE TABLE IF NOT EXISTS videoplayer.comentario (
    id_comentario  INT NOT NULL AUTO_INCREMENT,
    id_video INT NOT NULL,
    id_usuario INT NOT NULL,
    comentario VARCHAR(255),
    datahora DATETIME,
    PRIMARY KEY( id_comentario )
);