import { CART_TO_ADD, REMOVE_TO_CART,SHIPPING_INFO } from "../consants/CartConsant";

export const cartReducer = (state = { cartItems: [] }, action) => {
  switch (action.type) {
    case CART_TO_ADD: 
      const item = action.payload;
      const isItemExist = state.cartItems.find(
        (i) => i.product === item.product
      );

      if (isItemExist) {
        return {
          ...state,
          cartItems: state.cartItems.map((i) =>
            i.product === item.product ? item : i
          ),
        };
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems, item],
        };
      }
      case REMOVE_TO_CART:
        return {
          ...state,
          cartItems: state.cartItems.filter(item => item.product !== action.payload),
        };

        case SHIPPING_INFO:
          return{
            ...state,
       shippingInfo:action.payload,
          }
    default:   
      return state;
  }
};
  