import { Router } from 'express'
import UserControllers from '../Controllers/UserControllers'

const routes = Router()

routes.get('/', (req, res) => {
  return res.json({ Get: 'Get!' })
})

routes.get('/users', UserControllers.index)

routes.post('/users', UserControllers.create)

routes.put('/users/:id', UserControllers.update)

routes.delete('/users/:id', UserControllers.delete)
export = routes
