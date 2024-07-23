'use strict'

const Service = use('App/Models/Service')

class ServiceController {
  async index({ request, response }) {
    const services = await Service.all()
    return response.json(services)
  }

  async show({ params, request, response }) {
    const service = await Service.find(params.id)
    if (!service) {
      return response.status(404).json({ message: 'Service not found' })
    }
    return response.json(service)
  }

  async store({ request, response, auth }) {
    const data = request.only(['title', 'description', 'price'])
    const service = await Service.create({
      ...data,
      user_id: auth.user.id
    })
    return response.status(201).json(service)
  }

  async update({ params, request, response }) {
    const service = await Service.find(params.id)
    if (!service) {
      return response.status(404).json({ message: 'Service not found' })
    }
    const data = request.only(['title', 'description', 'price'])
    service.merge(data)
    await service.save()
    return response.json(service)
  }

  async destroy({ params, response }) {
    const service = await Service.find(params.id)
    if (!service) {
      return response.status(404).json({ message: 'Service not found' })
    }
    await service.delete()
    return response.status(204).send()
  }
}

module.exports = ServiceController
