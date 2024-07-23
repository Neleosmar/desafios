'use strict'

const Service = use('App/Models/Service')
const Transaction = use('App/Models/Transaction')
const User = use('App/Models/User')



class TransactionController {

    async create({ request, auth, response }) {
        const { service_id } = request.all()
        const service = await Service.find(service_id)
    
        if (auth.user.type !== 'client') {
          return response.status(403).json({ error: 'Only clients can hire services.' })
        }
    
        if (auth.user.balance < service.price) {
          return response.status(400).json({ error: 'Insufficient balance.' })
        }
    
        const transaction = new Transaction()
        transaction.service_id = service.id
        transaction.client_id = auth.user.id
        transaction.amount = service.price
    
        await transaction.save()
    
        auth.user.balance -= service.price
        await auth.user.save()
    
        const provider = await User.find(service.user_id)
        provider.balance += service.price
        await provider.save()
    
        return transaction
      }
    
      async history({ auth }) {
        const transactions = await Transaction.query().where('client_id', auth.user.id).fetch()
        return transactions
      }
}

module.exports = TransactionController
