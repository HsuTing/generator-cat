'use strict';

import nodemailer from 'nodemailer';
import React from 'react';
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

const mailOptions = {
  from: `<${process.env.email}>`,
  to: '',
  subject: 'test',
  html: renderToStaticMarkup(
    <div>hello world</div>
  )
};

transporter.sendMail(mailOptions, (error, info) => {
  if(error)
    return console.log(error);

  console.log('Message sent: ' + info.response);
});
