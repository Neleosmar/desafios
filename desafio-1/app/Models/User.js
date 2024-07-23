'use strict'

const Model = use('Model')
const Hash = use('Hash')

class User extends Model {
  static get hidden () {
    return ['password']
  }

  static async boot () {
    super.boot()
    // Adiciona o hook antes de salvar
    this.addHook('beforeSave', async (userInstance) => {
      if (userInstance.dirty.password) {
        userInstance.password = await Hash.make(userInstance.password)
      }
    })
  }

  services() {
    return this.hasMany('App/Models/Service')
  }

  transactions() {
    return this.hasMany('App/Models/Transaction')
  }
}

module.exports = User
