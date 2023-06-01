import { User } from '../model/User'
import { Request, Response } from 'express'

class UserControllers {
  public async index(req: Request, res: Response) {
    const users = await User.find() // Procurando todos os usuários no banco de dados

    // Validando se existe algo no banco dados
    if (!users || users === null || users === undefined)
      return res.json({ error: 'User Not Found' })

    return res.json(users)
  }

  public async create() {
    // implementação do método create
  }

  public async update() {
    // implementação do método update
  }

  public async delete() {
    // implementação do método delete
  }
}

export default new UserControllers()
