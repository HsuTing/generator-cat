import fs from 'fs';
import path from 'path';
import express from 'express';

import middleware from './middleware';

const ENV = process.env.NODE_ENV === 'production';
const BASE_DIR = path.resolve(__dirname, './../');
const ROUTERS = path.resolve(__dirname, './routes');
const app = express();

app.set('views', path.resolve(BASE_DIR, 'views'));
app.set('view engine', 'pug');

middleware(app);
app.use('/static', express.static(
  path.resolve(BASE_DIR, './public')
));

fs.readdirSync(ROUTERS).forEach(filename => {
  const filePath = path.resolve(ROUTERS, filename);
  const stats = fs.lstatSync(filePath);

  if(!stats.isDirectory()) {
    const routes = require(filePath).default;

    if(typeof routes === 'function')
      routes(app);
  }
});
