'use strict'

const User = use('App/Models/User')
const Hash = use('Hash')


class AuthController {
  async register({ request, response }) {
    const { username, nif, email, password, type } = request.all()

    const userExists = await User.findBy('email', email)
    if (userExists) {
      return response.status(400).json({ message: 'Email already exists' })
    }

     // Criptografa a senha
     const hashedPassword = await Hash.make(password)


    const user = await User.create({
      username,
      nif,
      email,
      password: hashedPassword,
      type
    })

    return response.status(201).json(user)
  }

  async login({ request, auth, response }) {
    const { email, password } = request.only(['email', 'password'])
    try {
      // Busca o usuário pelo email
      const user = await User.findByOrFail('email', email)

      // Verifica se a senha fornecida corresponde à senha armazenada no banco de dados
      const passwordVerified = await Hash.verify(password, user.password)
      if (!passwordVerified) {
        return response.status(400).json({ message: 'Invalid credentials' })
      }

      // Gera um token JWT para o usuário autenticado
      const token = await auth.generate(user)
      console.log(token)
      return response.json({ token })
    } catch (error) {
      console.error(error)  // Log do erro para depuração
      return response.status(400).json({ message: 'Invalid credentials' })
    }
  }
}

module.exports = AuthController
