import { Router } from 'express'

const routes = Router()

routes.get('/', (req, res) => {
  return res.json({ Get: 'Get!' })
})

routes.post('/users', (req, res) => {
  return res.json({ Post: 'Post!' })
})

routes.put('/users', (req, res) => {
  return res.json({ Put: 'Put!' })
})

routes.delete('/users', (req, res) => {
  return res.json({ Delete: 'Delete!' })
})
export = routes
