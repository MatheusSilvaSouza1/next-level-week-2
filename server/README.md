!!! INICIANDO PROJETO
##INICIANDO O PACKAGE.JSON 
yarn init -y

##ADD O TYPESCRIPT AO PROJETO
yarn add typescript -D

##CRIANDO AS CONFIGURACOES DO TYPESCRIPT
yarn tsc -init

##ADD TSC-NODE-DEVexecuta o servidor e reinia ele caso seja alterado
yarn add ts-node-dev -D

##add UM SCRIPT DENTRO DO PACKAGE.JSON PARA STARTAR O SERVIDOR
"scripts": {
    "start": "tsnd --transpile-only --ignore-watch node_modules --respawn src/server.ts"
  }

xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
!!! INSTALANDO DEPENDENCIAS
##EXPRESS
yarn add express
yarn add @types/express

##Knex e sqlite3
yarn add knex sqlite3

##cors e responsavel por permitir o acesso a nossa API por diferentes enderecos
yarn add cors

