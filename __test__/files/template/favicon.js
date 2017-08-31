'use strict';

export default checkContent => {
  checkContent(true, '<link rel="icon" type="image/png" sizes="16x16" href="{{ iconUrl }}public/favicon/favicon-16x16.png">');
};
