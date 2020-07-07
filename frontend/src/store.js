import { createStore, applyMiddleware, combineReducers } from "redux";
import ReduxPromise from "redux-promise";

import signInReducer from "./screens/Sign-in/SignInReducer";
import signUpReducer from "./screens/Sign-up/SignUpReducer";

const reducers = combineReducers({
  signIn: signInReducer,
  signUp: signUpReducer,
});

const store = createStore(reducers, applyMiddleware(ReduxPromise));

export default store;
