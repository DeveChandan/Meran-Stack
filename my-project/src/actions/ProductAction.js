import axios from "axios";
import {
  ALL_PRODUCT_FAIL,
  ALL_PRODUCT_REQUEST,
  ALL_PRODUCT_SUCCESS,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_DETAILS_FAIL,
} from "../consants/ProductConsant";

const baseURL = "http://localhost:4000/api/v1";

export const getAllProducts = ({
  keyword = '',
  currentPage = 1,
  resultPerPage = 8,
  price = [0, 2500],
  category = '',
  ratings = [0, 5],
}) => async (dispatch) => {
  try {
    dispatch({ type: ALL_PRODUCT_REQUEST });

    const params = new URLSearchParams();
    params.append('page', currentPage);
    if (keyword) {
      params.append('keyword', keyword);
    }
    if (resultPerPage) {
      params.append('resultPerPage', resultPerPage);
    }
    if (price && price.length === 2) {
      const [minPrice, maxPrice] = price;
      params.append('minPrice', minPrice);
      params.append('maxPrice', maxPrice);
    }
    if (category) {
      params.append('category', category);
    }
    if (ratings && ratings.length === 2) {
      const [minReviews, maxReviews] = ratings;
      params.append('minReviews', minReviews);
      params.append('maxReviews', maxReviews);
    }

    const url = `${baseURL}/products?${params.toString()}`;
    const response = await axios.get(url);
    const { data } = response;

    dispatch({
      type: ALL_PRODUCT_SUCCESS,
      payload: {
        products: data.products,
        productCount: data.productCount,
        resultPerPage: data.resultPerPage,
        totalPages: data.totalPages,
      },
      currentPage,
      resetProducts: currentPage === 1,
    });
  } catch (error) { 
    const errorMessage =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: ALL_PRODUCT_FAIL,
      payload: errorMessage,
    });
  }
};


export const getProductDetails = (id, source = 'products') => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_DETAILS_REQUEST });

    let response;

    if (source === 'products') {
      response = await axios.get(`${baseURL}/products/${id}`);
     
    } else {
      response = await axios.get(`${baseURL}/${id}`);
     
    }

    dispatch({
      type: PRODUCT_DETAILS_SUCCESS,
      payload: response.data,
    });

    console.log('I am working');
  } catch (error) {
    dispatch({
      type: PRODUCT_DETAILS_FAIL,
      payload: error.response.data.message || 'Something went wrong',
    });
  }
};
