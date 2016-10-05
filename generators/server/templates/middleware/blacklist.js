'use strict';

export default (req, res, next) => {
  if(req.url.indexOf('http') !== -1 || req.url.indexOf('https') !== -1)
    res.sendStatus(404);
  else
    next();
};
