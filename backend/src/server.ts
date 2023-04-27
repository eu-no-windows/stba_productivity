import 'reflect-metadata';
import express from 'express';
import cors from 'cors';
import routes from '@shared/routes';
import { AppDataSource } from './database/data-source';

const app = express();
app.use(express.json());
app.use(cors());

app.use(routes);

AppDataSource.initialize().then(async () => {
  // eslint-disable-next-line no-console
  console.log('App conectada ao bd ...');
  app.listen(3333, () => {
    // eslint-disable-next-line no-console
    console.log('Api rodando...');
  });
});
