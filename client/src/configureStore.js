import { createStore, applyMiddleware, compose } from "redux";
import thunkMiddleware from "redux-thunk";
import authReducer from "./reducer";
import {composeWithDevTools} from 'redux-devtools-extension'

export default function configureStore(preloadedState) {
  return createStore(
    authReducer,
    preloadedState,
    composeWithDevTools(applyMiddleware(thunkMiddleware))
  );
}