import { CART_TO_ADD, REMOVE_TO_CART, SHIPPING_INFO } from "../consants/CartConsant";
import axios from "axios";
const baseURL = "http://localhost:4000/api/v1";
//add to cart
export const addToCartItem = (id, quantity) => async (dispatch, getState) => {
  try {
    const { data } = await axios.get(`${baseURL}/products/${id}`);

    dispatch({
      type: CART_TO_ADD,
      payload: {
        product: data.product._id,
        name: data.product.name,
        price: data.product.price,
        image: data.product.images[0].url,
        stock: data.product.Stock,
        quantity,
      },
    });

    localStorage.setItem(
      "cartItems",
      JSON.stringify(getState().cart.cartItems)
    );
  } catch (error) {
    // Handle the error here or dispatch an action for error handling
    console.error(error);
  }
};

//remove from cart

export const removeFormCart = (id) => async (dispatch, getState) => {
  dispatch({
    type: REMOVE_TO_CART,
    payload: id,
  });
  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};
//Shipping info
export const shippingInfo=(date)=>async (dispatch)=>{
  dispatch({
    type:SHIPPING_INFO,
    payload:date,
    
  })
  localStorage.setItem("shippingInfo", JSON.stringify(date));
}