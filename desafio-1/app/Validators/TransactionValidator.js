'use strict'

class TransactionValidator {
  get rules () {
    return {
      service_id: 'required|integer|exists:services,id',
      amount: 'required|number'
    }
  }
}

module.exports = TransactionValidator
