import {
  createStore, combineReducers, applyMiddleware, compose,
} from 'redux';
import thunk, { ThunkMiddleware } from 'redux-thunk';
import logger from 'redux-logger';
import { IAppActions } from './types/app';
import AppReducer from './reducers/app';

const rootReducer = combineReducers({
  app: AppReducer,
});

export type TAppState = ReturnType<typeof rootReducer>;
type TAppActions = IAppActions;

let composeEnhancer = compose;
if (process.env.NODE_ENV !== 'production') {
  composeEnhancer = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
}

const store = createStore(
  rootReducer,
  composeEnhancer(
    applyMiddleware(thunk as ThunkMiddleware<TAppState, TAppActions>, logger),
  ),
);

export default store;