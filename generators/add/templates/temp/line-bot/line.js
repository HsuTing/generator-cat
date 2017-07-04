'use strict';

import {sendTextMessage} from 'cat-middleware/lib/koa-bot-line';

export default event => {
  const senderID = event.source.userId || event.source.groupId;
  const replyToken = event.replyToken;
  const timeOfMessage = event.timestamp;
  const message = event.message;

  console.log(`Received message for user ${senderID} and replyToken ${replyToken} at ${timeOfMessage} with message:`);
  console.log(JSON.stringify(message));

  const messageText = message.text;

  if(messageText)
    sendTextMessage(replyToken, messageText);
  else
    sendTextMessage(replyToken, 'Message with attachment received');
};
