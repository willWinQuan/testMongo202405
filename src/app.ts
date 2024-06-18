
import 'reflect-metadata';

import express from 'express';
import config from '@/config'

async function startServer() {
  const app = express();

  await require('./loaders').default({ expressApp: app });

  app.listen(config.port, () => {
    console.log(`server listening on prot: http://localhost:${config.port}`);
  })
    .on('error', err => {
      process.exit(1);
    });

}

startServer()
