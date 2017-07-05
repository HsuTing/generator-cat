'use strict';

import <%= queryName %> from './get<%= name %>';
import modify<%= name %> from './modify<%= name %>';

export default {
  query: {
    <%= queryName %>
  },

  mutation: {
    modify<%= name %>
  }
};
