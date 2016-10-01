'use strict';

import {combineReducers, createStore} from 'redux';
import <%= reducerName %>Reducer from './../reducers/<%= reducerName %>';

const reducers = combineReducers({
  <%= reducerName %>: <%= reducerName %>Reducer
});
export const store = createStore(reducers);
