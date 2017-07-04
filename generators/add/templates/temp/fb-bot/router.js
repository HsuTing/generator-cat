'use strict';

import body from 'koa-body';
import Router from 'koa-better-router';
import * as FBBot from 'cat-middleware/lib/koa-bot-fb';

import FBReceivedMessage from './fb';

const router = Router().loadMethods();

router.get('/', body(), FBBot.verifyToken);
router.post('/', body(), FBBot.receivedMessage(FBReceivedMessage));

export default router;
