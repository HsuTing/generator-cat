'use strict';

import 'babel-polyfill';
import process from 'process';
import koaRouter from 'koa-better-router';
import graphql from 'koa-graphql';

import schema from 'schemas/schema';

const ENV = process.env.NODE_ENV === 'production';
const router = koaRouter({prefix: '/graphql'}).loadMethods();

const graphqlMiddleware = graphql({
  schema,
  graphiql: !ENV,
  pretty: !ENV,
  formatError: /* istanbul ignore next */ error => {
    console.log(error);
    if(!ENV)
      return error;
  }
});

router.get('/', graphqlMiddleware);
router.post('/', graphqlMiddleware);

export default router;
