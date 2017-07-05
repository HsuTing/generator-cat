'use strict';

export default (state = {}, {type}) => {
  switch(type) {
    case 'CHANGE_<%= name.toUpperCase() %>':
      return state;

    default: return state;
  }
};
