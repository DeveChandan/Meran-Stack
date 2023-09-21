import {
    UPDATE_PROFILE_REQUEST,
    UPDATE_PROFILE_SUCCESS,
    UPDATE_PROFILE_FAIL,
    UPDATE_PROFILE_RESET,
    CLEAR_ERROR,
    UPDATE_PASSWORD_REQUEST,
    UPDATE_PASSWORD_SUCCESS,
    UPDATE_PASSWORD_FAIL,
    UPDATE_PASSWORD_RESET,


  } from "../consants/UserConsant.js";
  
  const initialState = {
    isUpdated: false,
  
    loading: false,
    error: null,
  }; 
  
  export const profileReducer = (state = initialState, action) => {
    const { type, payload } = action;
  
    switch (type) {
      case UPDATE_PROFILE_REQUEST:
        case UPDATE_PASSWORD_REQUEST:
        return {
          ...state,
          loading: true,
        };
      case UPDATE_PROFILE_SUCCESS:
        case UPDATE_PASSWORD_SUCCESS:
        return {
          ...state,
          loading: false,
          isUpdated: true,
        };
      case UPDATE_PROFILE_FAIL:
        case UPDATE_PASSWORD_FAIL:
        return {
          ...state,
          loading: false,
          error: payload,
        };
      case UPDATE_PROFILE_RESET:
        case UPDATE_PASSWORD_RESET:
        return {
          ...state,
          isUpdated: false,
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
  
