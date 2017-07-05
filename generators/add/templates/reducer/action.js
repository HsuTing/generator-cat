'use strict';

export const modify<%= name %> = options => ({
  ...options,
  type: 'CHANGE_<%= name.toUpperCase() %>'
});
