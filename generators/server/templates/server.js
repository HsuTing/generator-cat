import fs from 'fs';
import path from 'path';
import express from 'express';
import compression from 'compression';
import helmet from 'helmet';
import responseTime from 'response-time';
import favicon from 'serve-favicon';
import uncapitalize from 'express-uncapitalize';
import errorhandler from 'errorhandler';
import morgan from 'morgan';

import middleware from 'middleware/middleware';

const ENV = process.env.NODE_ENV === 'production';
const BASE_DIR = path.resolve(__dirname, './../');
const ROUTERS = path.resolve(__dirname, './routes');
const app = express();

app.set('views', path.resolve(BASE_DIR, 'views'));
app.set('view engine', 'pug');

app.use(compression());
app.use(helmet());
app.use(responseTime());
app.use(uncapitalize());
app.use(favicon(__dirname + './../public/favicon.ico'));
app.use('/public', express.static(
  path.resolve(BASE_DIR, './public'), {
    setHeaders: res => {
      if(process.env.NODE_ENV === 'production') {
        res.setHeader('Expires', new Date(Date.now() + 2592000000).toUTCString());
      }
    }
  }
));

middleware(app);

if(process.env.NODE_ENV === 'development') {
  app.use(errorhandler());
  app.use(morgan('dev'));
} else {
  app.use(morgan('combined'));
}

fs.readdirSync(ROUTERS).forEach(filename => {
  const filePath = path.resolve(ROUTERS, filename);
  const stats = fs.lstatSync(filePath);

  if(!stats.isDirectory()) {
    const routes = require(filePath).default;

    if(typeof routes === 'function')
      routes(app);
  }
});
