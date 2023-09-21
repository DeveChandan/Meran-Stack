import {
  ALL_PRODUCT_FAIL,
  ALL_PRODUCT_REQUEST,
  ALL_PRODUCT_SUCCESS,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_DETAILS_FAIL,
  CLEAR_ERROR,

} from "../consants/ProductConsant";


export const productsReducer = (
  state = {
    products: [],
    loading: false,
    error: null,
    productCount: 0,
    resultPerPage: 8,
    currentPage: 1,
    totalPages: 0,
  },
  action
) => {
  switch (action.type) {
    case ALL_PRODUCT_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case ALL_PRODUCT_SUCCESS: {
      const {
        products,
        productCount,
        resultPerPage,
        currentPage,
        totalPages,
      } = action.payload;

      // If resetProducts flag is true, it means it's a fresh request
      // and we need to replace the existing products in the state
      const updatedProducts = action.resetProducts ? products : [...state.products, ...products];

      return {
        ...state,
        loading: false,
        products: updatedProducts,
        productCount,
        resultPerPage,
        currentPage,
        totalPages,
      };
    }

    case ALL_PRODUCT_FAIL:
    case PRODUCT_DETAILS_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case PRODUCT_DETAILS_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case PRODUCT_DETAILS_SUCCESS:
      return {
        ...state,
        loading: false,
        product: action.payload.product,
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
export const productDetailsReducer = (state = {
  product: {},
  loading: false,
  error: null,
}, action) => {
  switch (action.type) {
    case PRODUCT_DETAILS_REQUEST:
      return {
        ...state,
        loading: true,
      };

      case PRODUCT_DETAILS_SUCCESS:
        return {
          ...state,
          loading: false,
          product: action.payload.product,
        };
      
    case PRODUCT_DETAILS_FAIL:
      return {
        ...state,
        loading: false,
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

