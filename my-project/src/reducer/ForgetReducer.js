import {
  FORGET_PASSWORD_REQUEST,
  FORGET_PASSWORD_SUCCESS,
  FORGET_PASSWORD_FAIL,
  CLEAR_ERROR,
} from "../consants/UserConsant.js";
const initialState = {
  error: null,
  loading: false,
  message: null,
};
export const forgetPasswordReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case FORGET_PASSWORD_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case FORGET_PASSWORD_SUCCESS:
      return {
        ...state,
        loading: false,
        message: true,
      };
    case FORGET_PASSWORD_FAIL:
      return {
        ...state,
        loading: false,
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
