import { legacy_createStore, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga"
import rootReducer from "./reducer/tdl2Reducer";
import { composeWithDevTools } from 'redux-devtools-extension';
import rootSaga from './saga/rootSaga'

const sagaMiddleware = createSagaMiddleware();
const middleware = applyMiddleware(sagaMiddleware);
const store = legacy_createStore(rootReducer, composeWithDevTools(middleware));

sagaMiddleware.run(rootSaga);

export default store;