import cors from 'cors'
import 'dotenv/config'
import express from 'express'
import routes from './routes/routes'

class App {
  express: express.Application

  constructor() {
    this.express = express()

    this.middleware()
    this.router()
  }

  private middleware(): void {
    this.express.use(express.json())
    this.express.use(cors())
  }

  private router(): void {
    this.express.use(routes)
  }
}

export default new App().express
