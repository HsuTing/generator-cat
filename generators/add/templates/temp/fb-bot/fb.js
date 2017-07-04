'use strict';

import {sendTextMessage} from 'cat-middleware/lib/koa-bot-fb';

export default event => {
  const senderID = event.sender.id;
  const recipientID = event.recipient.id;
  const timeOfMessage = event.timestamp;
  const message = event.message;

  console.log(`Received message for user ${senderID} and page ${recipientID} at ${timeOfMessage} with message:`);
  console.log(JSON.stringify(message));

  const messageText = message.text;
  const messageAttachments = message.attachments;

  if(messageText)
    sendTextMessage(senderID, messageText);
  else if(messageAttachments)
    sendTextMessage(senderID, 'Message with attachment received');
};
