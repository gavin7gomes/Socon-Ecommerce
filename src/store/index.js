import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import rootReducer from "./reducers";
import { compose } from "redux";
import { PRODUCTION } from "../utils/constants";
import { getEnvironment } from "../utils/misc";

const middleware = [thunk];

const DevEnhancer = composeWithDevTools(
  applyMiddleware(...middleware)
);

const ProdEnhancer = compose(
  applyMiddleware(...middleware),
);

const enhancer = getEnvironment() === PRODUCTION ? ProdEnhancer : DevEnhancer;

const store = createStore(rootReducer, enhancer);

export default store;
