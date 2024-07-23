'use strict'

const Env = use('Env')
const BaseExceptionHandler = use('BaseExceptionHandler')

class Handler extends BaseExceptionHandler {
  async handle(error, { response }) {
    if (Env.get('NODE_ENV') === 'development') {
      return response.status(error.status).json({
        message: error.message,
        stack: error.stack
      })
    }

    return response.status(error.status).json({
      message: 'Something went wrong'
    })
  }

  async * report (error, { logger }) {
    logger.error(error)
  }
}

module.exports = Handler
