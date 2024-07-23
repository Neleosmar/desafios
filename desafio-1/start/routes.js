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
Route.post('/register', 'AuthController.register')
Route.post('/login', 'AuthController.login')
Route.group(() => {
    Route.post('/services', 'ServiceController.create').middleware(['auth'])
    Route.get('/services', 'ServiceController.index')
  }).prefix('api')

Route.group(() => {
Route.post('/transactions', 'TransactionController.create').middleware(['auth'])
Route.get('/transactions', 'TransactionController.history').middleware(['auth'])
}).prefix('api')

Route.on('/').render('welcome')
