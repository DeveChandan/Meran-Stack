import {
  CLEAR_ERROR,
  CREATE_ORDER_FAIL,
  CREATE_ORDER_REQUEST,
  CREATE_ORDER_SUCCESS,
} from "../consants/OrderConsant";
import axios from "axios";
const baseURL = "http://localhost:4000/api/v1";

// CreateOrder
export const createOrder = (order) => async (dispatch, getState) => {
  try {
    dispatch({ type: CREATE_ORDER_REQUEST });
    const config = {
      headers: {
        "Content-Type": "application/json", 
      },
    };
    const { data } = await axios.post(`${baseURL}/order/new`, order, config);
    dispatch({ type: CREATE_ORDER_SUCCESS, payload: data }); // Fixed the payload assignment here
  } catch (error) {
    dispatch({
      type: CREATE_ORDER_FAIL,
      payload: error.response.data.message,
    });
  }
};

// ClearError
export const clearError = () => (dispatch) => {
  dispatch({ type: CLEAR_ERROR });
};
