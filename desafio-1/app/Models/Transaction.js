'use strict'

const Model = use('Model')

class Transaction extends Model {
  static get rules () {
    return {
      service_id: 'required|integer|exists:services,id',
      client_id: 'required|integer|exists:users,id',
      amount: 'required|number',
    }
  }

  service() {
    return this.belongsTo('App/Models/Service')
  }

  client() {
    return this.belongsTo('App/Models/User')
  }
}

module.exports = Transaction
