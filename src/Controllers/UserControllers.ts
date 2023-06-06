import { Request, Response } from 'express'
import { authPassword, authToken } from '../auth/authUser'
import { User } from '../model/User'

class UserControllers {
  public async index(req: Request, res: Response) {
    const users = await User.find() // Procurando todos os usuários no banco de dados

    // Validando se existe algo no banco dados
    if (!users || users === null || users === undefined)
      return res.status(404).json({ error: 'User Not Found' })

    return res.status(201).json(users) // Retornando todos os dados da tabela
  }

  public async create(req: Request, res: Response) {
    // implementação do método create
    const { email, password, username } = req.body

    // validando se existe informacoes
    if (!username || username === null || username === undefined)
      return res.status(404).json({ error: 'Username is required' })

    if (!email || email === null || email === undefined)
      return res.status(404).json({ error: 'Email is required' })

    if (!password || password === null || password === undefined)
      return res.status(404).json({ error: 'Password is required' })

    // validando tamnanho
    if (password.length < 8)
      return res.status(400).json({ error: 'Password is too short' })

    if (username.length < 3)
      return res.status(400).json({ error: 'Username is too short' })

    // validando email se existe o @
    if (!email.includes('@'))
      return res.status(400).json({ error: 'Email invalid' })

    const hashPassword = await authToken(password)

    try {
      const users = await User.create({
        username,
        email,
        password: hashPassword,
      }) // Criando usuario

      return res.status(201).json(users)
    } catch (err) {
      return res.status(500).json({ error: 'Internal Server Error' })
    }
  }

  public async update(req: Request, res: Response) {
    // implementação do método update
    const id = req.params.id // pegando o id
    const { email, username, password, newPassword } = req.body

    // verificando se existe o id
    if (!id || id === null || id === undefined)
      return res.status(404).json({ error: 'Id is required' })

    const users = await User.findById(id)

    // verificando se existe um usuario
    if (!users) return res.status(404).json({ error: 'User not found' })

    // verificando se tem @ no email
    if (email) {
      if (email.includes('@')) users.email = email
    }

    // verificando se o usuario passou o username
    if (username) {
      if (username.length > 3) users.username = username // varifica se o username tem +3 letras
    }

    // verificando se o usuario passou a password
    if (password) {
      if (password.length >= 8) {
        // ele verifica se a senha eh maior ou igual a 8
        const authAndNewHash = await authPassword(
          // aqui ele passa a password que o usuario passou e a senha que ta salvo no banco de dados
          password, // ele vai comparar as duas senhas se sao as mesmas
          users.password,
          newPassword, // ele vai pegar a nova senha e authenticar ela
        )

        // verificando se o retorno da funcao eh igual a Value invalid, se for ele retorna error
        if (authAndNewHash === 'Value invalid')
          return res.status(404).json({ Error: 'Password invalid' })
        users.password = authAndNewHash
      }
    }

    //  salva o usuario
    users.save()

    return res.status(200).json(users)
  }

  public async delete(req: Request, res: Response) {
    // implementação do método delete

    const id = req.params.id // pegando o id do params

    try {
      if (!(await User.findOne({ _id: id })))
        return res.status(404).json({ error: 'User Not Find' })

      await User.findByIdAndDelete({ _id: id })
      return res.status(201).json({ success: 'User have been deleted' })
    } catch (err) {
      return res.status(500).json({ error: 'error ao deletar' })
    }

    // procurando id no banco de dados se n existir ele retornar not found
  }
}

export default new UserControllers()
