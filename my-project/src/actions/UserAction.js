import {
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
  LOGOUT_SUCCESS,
  LOGOUT_FAIL,
  UPDATE_PROFILE_REQUEST,
  UPDATE_PROFILE_SUCCESS,
  UPDATE_PROFILE_FAIL,
  UPDATE_PASSWORD_REQUEST,
  UPDATE_PASSWORD_SUCCESS,
  UPDATE_PASSWORD_FAIL,
  FORGET_PASSWORD_REQUEST,
  FORGET_PASSWORD_SUCCESS,
  FORGET_PASSWORD_FAIL,
} from "../consants/UserConsant";
import axios from "axios";
const baseURL = "http://localhost:4000/api/v1";

export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: LOGIN_REQUEST });
    const config = { headers: { "Content-Type": "application/json" } };

    const { data } = await axios.post(
      `${baseURL}/login`,
      { email, password },
      config
    );

    const authToken = data.token; // Assuming the response contains a 'token' field
    localStorage.setItem("authToken", authToken);
    console.log("Auth token stored:", authToken);

    dispatch({ type: LOGIN_SUCCESS, payload: data.user });
  } catch (error) {
    dispatch({ type: LOGIN_FAIL, payload: error.response.data.message });
  }
};

export const loadUser = () => async (dispatch) => {
  try {
    dispatch({ type: LOAD_USER_REQUEST });

    

    const { data } = await axios.get(`${baseURL}/me`);

    dispatch({ type: LOAD_USER_SUCCESS, payload: data.user });
  } catch (error) {
    dispatch({ type: LOAD_USER_FAIL, payload: error.response.data.message });
  }
};
/*
export const loadUser = () => async (dispatch) => {
  try {
    dispatch({ type: LOAD_USER_REQUEST });
    const { data } = await axios.get(`${baseURL}/me`);
  
    dispatch({ type: LOAD_USER_SUCCESS, payload: data.user });
  } catch (error) {
    dispatch({ type: LOAD_USER_FAIL, payload: error.response.data.message });
  }
};
*/
export const logout = () => async (dispatch) => {
  try {
    await axios.get(`${baseURL}/logout`);

    dispatch({ type: LOGOUT_SUCCESS });
    console.log("Logout successful");
  } catch (error) {
    dispatch({ type: LOGOUT_FAIL, payload: error.response.data.message });
    console.log("Logout failed:", error.response.data.message);
  }
};
//Register
export const register = (userData) => async (dispatch) => {
  try {
    dispatch({ type: REGISTER_REQUEST });
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };
    const { data } = await axios.post(`${baseURL}/register`, userData, config);
    dispatch({ type: REGISTER_SUCCESS, payload: data.user });
  } catch (error) {
    dispatch({ type: REGISTER_FAIL, payload: error.response.data.message });
  }
};

//ClearError
export const clearError = () => (dispatch) => {
  dispatch({ type: CLEAR_ERROR });
};

//Updated
export const updateProfile = (userData) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_PROFILE_REQUEST });
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };
    const { data } = await axios.put(`${baseURL}/me/update`, userData, config);
    dispatch({ type: UPDATE_PROFILE_SUCCESS, payload: data.user });
  } catch (error) {
    dispatch({
      type: UPDATE_PROFILE_FAIL,
      payload: error.response.data.message,
    });
  }
};
//Updated
export const updatePassword = (password) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_PASSWORD_REQUEST });
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.put(
      `${baseURL}/password/update`,
      password,
      config
    );
    dispatch({ type: UPDATE_PASSWORD_SUCCESS, payload: data.user });
  } catch (error) {
    dispatch({
      type: UPDATE_PASSWORD_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const forgetPassword = (email) => async (dispatch) => {
  try {
    // Dispatch a request action to indicate that the API call has started
    dispatch({ type: FORGET_PASSWORD_REQUEST });

    // Prepare the request configuration
    const config = { headers: { "Content-Type": "application/json" } };

    // Make the API call using axios and wait for the response
    const { data } = await axios.post(
      `${baseURL}/password/forgot`,
      { email },
      config
    );

    // If the API call is successful, dispatch the success action with the response data
    dispatch({ type: FORGET_PASSWORD_SUCCESS, payload: data.message });
  } catch (error) {
    // If there's an error with the API call, dispatch the failure action with the error message
    dispatch({
      type: FORGET_PASSWORD_FAIL,
      payload: error.response.data.message,
    });
  }
};
