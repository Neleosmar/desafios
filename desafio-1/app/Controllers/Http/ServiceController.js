'use strict'

const Service = use('App/Models/Service')


class ServiceController {

    async create({ request, auth }) {
        const { title, description, price } = request.all()
        const service = new Service()
        service.title = title
        service.description = description
        service.price = price
        service.user_id = auth.user.id
        await service.save()
        return service
      }
    
      async index() {
        const services = await Service.all()
        return services
      }
}

module.exports = ServiceController
