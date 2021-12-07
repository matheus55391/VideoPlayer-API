# VIDEOPLAYER API

Esse foi um projeto feito para conclusão da faculdade, consiste em uma API que serve
como o backend para um site de reprodução de video semelhante ao youtube. 

O aplicativo é iniciado no arquivo `server.js`.

O arquivo `configurar.sql` contem scripts para criação da base de dados da aplicação e deve ser rodado no mysql.

E no arquivo `.env` onde sera armazenado localmente algumas variaveis importantes para o sistema, para funcionar podemos remover o `_exemple` do arquivo `.env_exemple`.

O aplicativo é iniciado com o comando `npm run start`.

O aplicativo tambem pode ser iniciado em modo desenvolvimento utilizando o comando `npm run dev`, tendo como vantagem a utilização da biblioteca nodemon.

Já deixei o modo debug configurado no arquivo `launch.json`, para acessar esse modo aperte `F5` com a ferramenta vscode.

## Instalação

    npm install

## Iniciando aplicativo

    npm run start