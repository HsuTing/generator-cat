'use strict';

import nodemailer from 'nodemailer';
import {renderToStaticMarkup} from 'react-dom/server';

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: process.env.email,
    pass: process.env.password
  }
});

export default options => {
  transporter.sendMail({
    from: `<${process.env.email}>`,
    to: options.recipient,
    subject: options.subject,
    html: renderToStaticMarkup(
      options.content
    )
  }, (error, info) => {
    if(error)
      return console.log(error);

    console.log('Message sent: ' + info.response);
  });
};
