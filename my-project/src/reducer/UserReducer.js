/*import {
  LOGIN_FAIL,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  CLEAR_ERROR,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOAD_USER_REQUEST,
  LOAD_USER_SUCCESS,
  LOAD_USER_FAIL,
} from "../consants/UserConsant"; // Make sure the import path is correct

export const userReducer = (state = { user: {} }, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
    case REGISTER_REQUEST:
    case LOAD_USER_REQUEST:
      return {
        loading: true,
        isAuthenticated: false,
      };
    case LOGIN_SUCCESS:
    case REGISTER_SUCCESS:
    // Fix: Use LOAD_USER_SUCCESS here
      return {
        ...state,
        loading: false,
        isAuthenticated: true,
        user: action.payload,
      };
      case LOAD_USER_SUCCESS: // Fix: Use LOAD_USER_SUCCESS here
      return {
        ...state,
        loading: false,
 
        user: action.payload,
      };
    case LOGIN_FAIL:
    case REGISTER_FAIL:

      return {
        ...state,
        loading: false,
        isAuthenticated: false,
        user: null,
        error: action.payload,
      };
      case LOAD_USER_FAIL: // Fix: Use LOAD_USER_FAIL here
      return {
        ...state,
        loading: false,
        user: null,
        error: action.payload,
      };
    case CLEAR_ERROR:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

*/

// userReducer.js
import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOAD_USER_REQUEST,
  LOAD_USER_SUCCESS,
  LOAD_USER_FAIL,
  LOGOUT_SUCCESS,
  LOGOUT_FAIL,
  CLEAR_ERROR,
} from "../consants/UserConsant";

const initialState = {
  user: null, // Set user to null instead of an empty object
  loading: false,
  isAuthenticatedUser: false,
  error: null,
};

export const userReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case LOGIN_REQUEST:
    case REGISTER_REQUEST:
    case LOAD_USER_REQUEST:
      return {
        ...state,
        loading: true,
        isAuthenticatedUser: false,
      };
    case LOGIN_SUCCESS:
    case REGISTER_SUCCESS:
    case LOAD_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        isAuthenticatedUser: true,
        user: payload,
      };
    case LOGOUT_SUCCESS:
      return {
        loading: false,
        isAuthenticatedUser: false,
        user: null,
      };
    case LOGIN_FAIL:
    case REGISTER_FAIL: 
    case LOAD_USER_FAIL:
      return {
        ...state,
        loading: false,

        error: payload,
      };
    case LOGOUT_FAIL:
      return { 
        ...state,
        loading: false,
        isAuthenticatedUser: false,
        user: null,
        error: payload,
      };
    case CLEAR_ERROR:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};


