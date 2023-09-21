/*import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { productDetailsReducer, productsReducer } from './reducer/ProductReducer';
import { userReducer } from './reducer/UserReducer';

const rootReducer = combineReducers({
  products: productsReducer,
  productDetails: productDetailsReducer,
  user: userReducer,
});

const initialState = {};
const middleware = [thunk];
const store = createStore(
  rootReducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export { store };
*/
import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  productDetailsReducer,
  productsReducer,
} from "./reducer/ProductReducer";
import { userReducer } from "./reducer/UserReducer";
import { profileReducer } from "./reducer/ProfileReducer";
import { forgetPasswordReducer } from "./reducer/ForgetReducer";
import { cartReducer } from "./reducer/CartReducer";
import { newOrderReducer } from "./reducer/OderReducer";
const rootReducer = combineReducers({
  products: productsReducer,
  productDetails: productDetailsReducer,
  user: userReducer,
  profile: profileReducer,
  forget: forgetPasswordReducer,
  cart: cartReducer,
  newOrder:newOrderReducer,
});

const initialState = {
  cart: {
    cartItems: localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems"))
      : [],
      shippingInfo:localStorage.getItem("shippingInfo")
      ? JSON.parse(localStorage.getItem("shippingInfo"))
      :{}
  },
};
const middleware = [thunk];
const store = createStore(
  rootReducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export { store };
