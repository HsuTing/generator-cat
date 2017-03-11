'use strict';

import body from 'koa-body';
import Router from 'koa-better-router';
import * as LineBot from 'cat-middleware/lib/koa-bot-line';

import LineReceivedMessage from './line';

const router = Router().loadMethods();

router.post('/', body(), LineBot.receivedMessage(LineReceivedMessage));

export default router;
