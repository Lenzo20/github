import { Router } from 'express'

const routes = Router()

routes.get('/', (req, res) => {
  return res.json({ Hello: 'Hello, World!' })
})

export = routes
