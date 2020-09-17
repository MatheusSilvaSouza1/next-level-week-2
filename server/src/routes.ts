import { Router, Request, Response } from 'express'
import ClassesController from './controllers/ClassesController'
import ConnectionsController from './controllers/ConnectionsController'

const router = Router()

/*
    !!PARAMETROS
    * Corpo {request.body}: dados para a criacao ou atualizacao de um registro
    ? Obter o cropo da requisicao: request.body

    * Route Params: Identificar qual recurso eu quero atualizar ou excluior. 
    ? Ex: users/:id  
    ? o dois pontos server para identificar que e um parametro
    ? obter esse parametro: request.params
    
    * Query Params: Paginacao, filtros, ordenacao e etc...
    ? obter esse parametro: request.params
*/

const classesController = new ClassesController()
const connectionsController = new ConnectionsController()

router.post('/classes', classesController.create)
router.get('/classes', classesController.index)

router.post('/connections', connectionsController.create)
router.get('/connections', connectionsController.index)

export { router }
