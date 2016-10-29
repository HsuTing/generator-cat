'use stirct';

import path from 'path';
<% middleware.forEach(function(module) { -%>
<% if(module === 'compression') { -%>
import compression from 'compression';
<% } else if(module === 'body-parser') { -%>
import bodyParser from 'body-parser';
<% } else if(module === 'cookie-parser') { -%>
import cookieParser from 'cookie-parser';
<% } else if(module === 'cookie-session') { -%>
import cookieSession from 'cookie-session';
<% } else if(module === 'errorhandler') { -%>
import errorhandler from 'errorhandler';
<% } else if(module === 'morgan') { -%>
import morgan from 'morgan';
<% } else if(module === 'response-time') { -%>
import responseTime from 'response-time';
<% } else if(module === 'serve-favicon') { -%>
import favicon from 'serve-favicon';
<% } else if(module === 'express-uncapitalize') { -%>
import uncapitalize from 'express-uncapitalize';
<% } else if(module === 'helmet') { -%>
import helmet from 'helmet';
<% } else if(module === 'passport') { -%>
import passport from 'passport';
<% } else if(module === 'static-expiry') { -%>
import expiry from 'static-expiry';
<% } -%>
<% }) -%>

export default app => {
<% middleware.forEach(function(module) { -%>
<% if(module === 'compression') { -%>
  app.use(compression());
<% } else if(module === 'body-parser') { -%>
  app.use(bodyParser.urlencoded({extended: false}));
  app.use(bodyParser.json());
<% } else if(module === 'cookie-parser') { -%>
  app.use(cookieParser());
<% } else if(module === 'cookie-session') { -%>
  app.set('trust proxy', 1);
  app.use(cookieSession({
    name: 'session',
    keys: ['key']
  }));
<% } else if(module === 'errorhandler') { -%>
  if(process.env.NODE_ENV === 'development')
    app.use(errorhandler());
<% } else if(module === 'morgan') { -%>
  if(process.env.NODE_ENV === 'development')
    app.use(morgan('dev'));
  else
    app.use(morgan('combined'));
<% } else if(module === 'response-time') { -%>
  app.use(responseTime());
<% } else if(module === 'serve-favicon') { -%>
  app.use(favicon(__dirname + './../public/favicon.ico'));
<% } else if(module === 'express-uncapitalize') { -%>
  app.use(uncapitalize());
<% } else if(module === 'helmet') { -%>
  app.use(helmet());
<% } else if(module === 'passport') { -%>
  app.use(passport.initialize());
  app.use(passport.session());
<% } else if(module === 'static-expiry') { -%>
  app.use(expiry(app, {dir: path.join(__dirname, './../public')}));
<% } -%>
<% }) -%>
};
