'use strict'

class ServiceValidator {
  get rules () {
    return {
      title: 'required|string',
      description: 'required|string',
      price: 'required|number'
    }
  }
}

module.exports = ServiceValidator
