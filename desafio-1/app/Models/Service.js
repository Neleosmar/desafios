'use strict'

const Model = use('Model')

class Service extends Model {
  static get rules () {
    return {
      title: 'required|string',
      description: 'required|string',
      price: 'required|number',
    }
  }

  user() {
    return this.belongsTo('App/Models/User')
  }

  transactions() {
    return this.hasMany('App/Models/Transaction')
  }
}

module.exports = Service
