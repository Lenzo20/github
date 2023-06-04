import { Router } from 'express'
import UserControllers from '../Controllers/UserControllers'

const routes = Router()

routes.get('/', (req, res) => {
  return res.json({ Get: 'Get!' })
})

routes.get('/users', UserControllers.index)

routes.post('/users', (req, res) => {
  return res.json({ Post: 'Post!' })
})

routes.put('/users', (req, res) => {
  return res.json({ Put: 'Put!' })
})

routes.delete('/users', UserControllers.delete)
export = routes
