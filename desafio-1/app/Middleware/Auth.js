'use strict'

const { verify } = require('@adonisjs/auth/src/Drivers/JwtDriver')

class Auth {
  async handle ({ request, auth }, next) {
    try {
      const token = request.input('token') || request.header('Authorization').split(' ')[1]
      const decoded = await verify(token)
      request.auth = decoded
      await next()
    } catch (error) {
      return response.status(401).json({ message: 'Unauthorized' })
    }
  }
}

module.exports = Auth
