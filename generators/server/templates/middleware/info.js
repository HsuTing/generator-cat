'use strict';

export default (req, res, next) => {
  const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;

  const date = new Date();
  let time = date.getFullYear() + '/' + date.getMonth() + '/' + date.getDate() + ' ';
  time += date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds() + ' ';
  time += 'GMT ' + (-1 * date.getTimezoneOffset() / 60);

  console.log('[request time]  ' + time);
  console.log('[request from]  ' + ip);
  console.log('[request url]  ' + req.url);

  next();
};
