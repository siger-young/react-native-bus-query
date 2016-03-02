
// import { createStore as _createStore, applyMiddleware } from 'redux';
// import thunkMiddleware from 'redux-thunk';
//
// import reducer from './reducer';
// import createLogger from 'redux-logger';
//
// const middleWares = [
//   thunkMiddleware,
// ];
//
// if (__DEV__) {
//   middleWares.unshift(createLogger());
// }
//
// const finalCreateStore = applyMiddleware(
//   ...middleWares
// )(_createStore);
//
// const store = finalCreateStore(reducer);
// export default store;

import { Platform } from 'react-native';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import devTools from 'remote-redux-devtools';
import reducer from './reducer';

export default function configureStore(initialState) {
  const enhancer = compose(
    applyMiddleware(thunk),
    devTools({
      name: Platform.OS,
      hostname: '192.168.0.120',
      port: 5678
    })
  );
  return createStore(reducer, initialState, enhancer);
}
