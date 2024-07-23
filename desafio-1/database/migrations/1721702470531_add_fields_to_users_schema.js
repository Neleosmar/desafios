'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AddFieldsToUsersSchema extends Schema {
  up () {
    this.table('users', (table) => {
      table.string('nif').notNullable().unique().defaultTo('')
      table.enu('type', ['client', 'provider']).notNullable().defaultTo('client')
      table.float('balance').defaultTo(0.0)    
    })
  }

  down () {
    this.table('users', (table) => {
      table.string('nif').notNullable().unique().defaultTo('')
      table.enu('type', ['client', 'provider']).notNullable().defaultTo('client')
      table.float('balance').defaultTo(0.0)  
    })
  }
}

module.exports = AddFieldsToUsersSchema
