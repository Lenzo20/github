import express from 'express';
import routes from './routes/routes';

class App {
  public express: express.Application;

  constructor() {
    this.express = express();
    this.router();
  }

  public middlewares(): void {
    this.express.use(express.json());
  }

  public databases(): void {
    // ja ja adiciono o banco de dados
  }

  public router(): void {
    this.express.use(routes);
  }
}

export default new App().express;