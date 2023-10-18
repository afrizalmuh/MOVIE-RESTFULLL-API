import cors from 'cors'
import express, { Router } from 'express'
import { router } from './routers/index_router'

export const setupServer = () => {
  const server = express();
  const routes = Router();

  routes.use(express.json());
  routes.use(cors())

  server.use(routes);
  
  server.use('/', router);

  return server;
}