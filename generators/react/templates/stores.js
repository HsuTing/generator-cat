'use strict';

import {combineReducers, createStore} from 'redux';
<% for(index in reducerName) { -%>
import <%= reducerName[index] %>Reducer from './../reducers/<%= reducerName[index] %>';
<% } -%>

const reducers = combineReducers({
<% for(index in reducerName) { -%>
  <%= reducerName[index] %>: <%= reducerName[index] %>Reducer<% if(index != reducerName.length - 1) { %>,<% } %>
<% } -%>
});
export default createStore(reducers);
