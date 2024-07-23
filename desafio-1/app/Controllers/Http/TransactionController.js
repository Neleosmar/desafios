'use strict'

const Transaction = use('App/Models/Transaction')

class TransactionController {
  async index({ request, response }) {
    const transactions = await Transaction.all()
    return response.json(transactions)
  }

  async show({ params, request, response }) {
    const transaction = await Transaction.find(params.id)
    if (!transaction) {
      return response.status(404).json({ message: 'Transaction not found' })
    }
    return response.json(transaction)
  }

  async store({ request, response, auth }) {
    const data = request.only(['service_id', 'amount'])
    const transaction = await Transaction.create({
      ...data,
      user_id: auth.user.id
    })
    return response.status(201).json(transaction)
  }

  async update({ params, request, response }) {
    const transaction = await Transaction.find(params.id)
    if (!transaction) {
      return response.status(404).json({ message: 'Transaction not found' })
    }
    const data = request.only(['service_id', 'amount'])
    transaction.merge(data)
    await transaction.save()
    return response.json(transaction)
  }

  async destroy({ params, response }) {
    const transaction = await Transaction.find(params.id)
    if (!transaction) {
      return response.status(404).json({ message: 'Transaction not found' })
    }
    await transaction.delete()
    return response.status(204).send()
  }

  async history({ response, auth }) {
    const transactions = await Transaction.query().where('user_id', auth.user.id).fetch()
    return response.json(transactions)
  }
}

module.exports = TransactionController
