'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')
// Rotas de Autenticação
Route.post('/register', 'AuthController.register')
Route.post('/login', 'AuthController.login')

// Grupo de Rotas Protegidas por Autenticação
Route.group(() => {
  // Rotas para Gerenciamento de Serviços
  Route.get('/services', 'ServiceController.index') // Listar todos os serviços
  Route.get('/services/:id', 'ServiceController.show') // Obter detalhes de um serviço específico
  Route.post('/services', 'ServiceController.store') // Criar um novo serviço
  Route.put('/services/:id', 'ServiceController.update') // Atualizar um serviço específico
  Route.delete('/services/:id', 'ServiceController.destroy') // Excluir um serviço específico
  
  // Rotas para Gerenciamento de Transações
  Route.get('/transactions', 'TransactionController.index') // Listar todas as transações
  Route.get('/transactions/:id', 'TransactionController.show') // Obter detalhes de uma transação específica
  Route.post('/transactions', 'TransactionController.store') // Criar uma nova transação
  Route.put('/transactions/:id', 'TransactionController.update') // Atualizar uma transação específica
  Route.delete('/transactions/:id', 'TransactionController.destroy') // Excluir uma transação específica
  
  // Rota para Histórico de Transações
  Route.get('/transactions/history', 'TransactionController.history') // Obter o histórico de transações do usuário autenticado
}).prefix('api').middleware('auth')