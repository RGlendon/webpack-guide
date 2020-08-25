import {createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';

import reducers from './reducers/index';

const middleware = [thunk];

// для работы devtools
const composeEnhancers =
  typeof window !== 'undefined'
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    : compose;

// указываем, чтобы preloaded state загрузался из redux, и подгружаем его вместо undefined (24 строка)
let state;
if (typeof window !== 'undefined') {
  state = window.__PRELOADED_STATE__;
  delete window.__PRELOADED_STATE__;
}

const store = createStore(
  reducers,
  // undefined,
  state,
  composeEnhancers(applyMiddleware(...middleware)));


export {store};