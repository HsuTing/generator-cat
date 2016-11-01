'use stirct';

<% middleware.forEach(function(module) { -%>
<% if(module === 'cookie-parser') { -%>
import cookieParser from 'cookie-parser';
<% } else if(module === 'cookie-session') { -%>
import cookieSession from 'cookie-session';
<% } else if(module === 'body-parser') { -%>
import bodyParser from 'body-parser';
<% } else if(module === 'passport') { -%>
import passport from 'passport';
<% } -%>
<% }) -%>

export default app => {
<% middleware.forEach(function(module) { -%>
<% if(module === 'cookie-parser') { -%>
  app.use(cookieParser());
<% } else if(module === 'cookie-session') { -%>
  app.set('trust proxy', 1);
  app.use(cookieSession({
    name: 'session',
    keys: ['key']
  }));
<% } else if(module === 'body-parser') { -%>
  app.use(bodyParser.urlencoded({extended: false}));
  app.use(bodyParser.json());
<% } else if(module === 'passport') { -%>
  app.use(passport.initialize());
  app.use(passport.session());
<% } -%>
<% }) -%>
};
