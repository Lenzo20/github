import { Request, Response } from 'express'
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

    try {
      const users = await User.create({
        username,
        email,
        password,
      }) // Criando usuario

      return res.status(201).json(users)
    } catch (err) {
      return res.status(500).json({ error: 'Internal Server Error' })
    }
  }

  public async update(req: Request, res: Response) {
    // implementação do método update
    const id = req.params.id
    const { email, username } = req.body

    if (!id || id === null || id === undefined)
      return res.status(404).json({ error: 'Id is required' })

    const users = await User.findById(id)

    if (!users) return res.status(404).json({ error: 'User not found' })

    if (email) {
      if (email.includes('@')) users.email = email
    }

    if (username) users.username = username

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
