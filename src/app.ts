import express from 'express';

class App {
  public express: express.Application;

  constructor() {
    this.express = express();
  }

  public middlewares(): void {
    this.express.use(express.json());
  }

  public databases(): void {
    // ja ja adiciono o banco de dados
  }

}



export default new App().express;