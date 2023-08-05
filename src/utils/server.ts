import express, { Application } from 'express';
import cors from 'cors';

import routes from '../routes';

function createServer(): Application {
  const app: Application = express();

  // Middlewares
  app.use(express.json());
  app.use(express.urlencoded({extended: false}));
  app.use(cors());

  app.use(routes);

  return app;
}

export default createServer;
