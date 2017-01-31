'use strict';

const resize = DOM => {
  const check = (
    (DOM.offsetWidth / DOM.offsetHeight) >=
    (DOM.parentNode.offsetWidth / DOM.parentNode.offsetHeight)
  );

  DOM.style.width = check ? '100%' : 'initial';
  DOM.style.height = check ? 'initial' : '100%';
};

export default DOMs => {
  if(DOMs instanceof Array)
    DOMs.map(resize);
  else
    resize(DOMs);
};
