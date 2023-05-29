import { Router } from 'express';

const routes = Router();

routes.get('/', () => {
  return 'Hello, World!';
});

export = routes