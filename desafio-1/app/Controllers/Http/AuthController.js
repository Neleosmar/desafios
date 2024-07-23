'use strict'

const User = use('App/Models/User')


class AuthController {
    async register({ request, response }) {
        const { username, nif, email, password, type } = request.all()
        const user = await User.create({ username, nif, email, password, type })
        return response.status(201).json(user)
    }

    async login({ request, auth }) {
        const { email, password } = request.all()
        const token = await auth.attempt(email, password)
        return token
    }


}

module.exports = AuthController
