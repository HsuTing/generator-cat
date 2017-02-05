'use strict';

import nodemailer from 'nodemailer';
import {renderToStaticMarkup} from 'react-dom/server';

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: process.env.MAIL_EMAIL,
    pass: process.env.MAIL_PASSWORD
  }
});

export default options => {
  transporter.sendMail({
    from: `<${process.env.MAIL_EMAIL}>`,
    to: options.recipient,
    subject: options.subject,
    html: renderToStaticMarkup(
      options.content
    )
  }, (error, info) => {
    if(error)
      return console.log(error);

    console.log(`Message sent: ${info.response}`);
  });
};
