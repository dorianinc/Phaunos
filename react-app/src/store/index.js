import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import session from './session'
import trailsReducer from './trails';
import reviewsReducer from './reviews';
import listsReducer from './lists';
import bookmarksReducer from './bookmarks';
import weatherReducer from './weather';

const rootReducer = combineReducers({
  session,
  trails: trailsReducer,
  reviews: reviewsReducer, 
  lists: listsReducer,
  bookmarks: bookmarksReducer,
  weather: weatherReducer
});

let enhancer;

if (process.env.NODE_ENV === 'production') {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = require('redux-logger').default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
  return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;
