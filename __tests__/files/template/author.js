'use strict';

export default checkContent => {
  checkContent(true, '<link rel="author" href="http://hsuting.com/author/">');
  checkContent(true, '<link rel="license" href="http://hsuting.com/copyright/">');
  checkContent(true, '<link rel="me" href="http://hsuting.com" type="text/html">');
  checkContent(true, '<link rel="me" href="mailto:hsuting0106@gmail.com">');
};
