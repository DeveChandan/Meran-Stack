import { useEffect, useReducer, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProductDetails } from "../../actions/ProductAction";
import { useParams } from "react-router-dom";
import Loading from "../loder/Loading";
import "./produtDetails.css";

import ReactStars from "react-rating-stars-component";
import Reviews from "./Reviews";
import { toast } from "react-toastify";
import Metadate from "../Metadate";
import { addToCartItem } from "../../actions/CartAction";

const initialState = {
  currentImageIndex: 0,
};

function reducer(state, action) {
  switch (action.type) {
    case "PREV":
      if (state.currentImageIndex > 0) {
        return {
          ...state,
          currentImageIndex: state.currentImageIndex - 1,
        };
      }
      return state;
    case "NEXT":
      if (state.currentImageIndex < action.imageCount - 1) {
        return {
          ...state,
          currentImageIndex: state.currentImageIndex + 1,
        };
      }
      return state;
    default:
      throw new Error("Unexpected action");
  }
}

const ProductDeatils2 = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { loading, product, error } = useSelector(
    (state) => state.productDetails
  );
  const [state, dispatchReducer] = useReducer(reducer, initialState);

  const [quantity, setQuantity]=useState(1);
const incriseQuantity=()=>{
  if (quantity.stock <= quantity) return
  const qty=quantity+1;
  setQuantity(qty)
};
const decriseQuantity=()=>{
  if (2 >+ quantity) return
  const qty=quantity-1;
  setQuantity(qty)
}

  useEffect(() => {
    if (error) {
      toast.error(error , {
        position: toast.POSITION.BOTTOM_CENTER
      });
    }
    dispatch(getProductDetails(id));
  }, [dispatch, error, id]);

  const handlePrevClick = () => {
    dispatchReducer({ type: "PREV" });
  };

  const handleNextClick = () => {
    dispatchReducer({ type: "NEXT", imageCount: product.images.length });
  };

  const ratingOptions = {
    edit: false,
    color: "rgba(20, 20, 20, 0.1)",
    activeColor: "tomato",
    size: window.innerWidth < 600 ? 20 : 25,
    value: product.rating,
    isHalf: true,
  
  };
const cartHandlerClick=()=>{
  dispatch(addToCartItem(id,quantity))
  toast.success(`Add to cart Product=${quantity}` , {
    position: toast.POSITION.BOTTOM_CENTER
  });
}

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          <Metadate title={`${product.name}`} />
          <div className="bgD">
            <div className="flex justify-center items-center text-2xl font-bold text2 t">
              Product Details
            </div>
            <div className="sm:flex m-6 sm:m-6 justify-center items-center sm:p-10">
              <div className="productDetails Details w-80 sm:w-1/2 m-5 p-16 sm:p-5 sm:flex justify-center items-center">
                <div className="flex justify-center items-center">
                  <button
                    onClick={handlePrevClick}
                    disabled={state.currentImageIndex === 0}
                  >
                    Prev
                  </button>
                  {product.images && product.images.length > 0 ? (
                    <>
                      <img
                        src={product.images[state.currentImageIndex].url}
                        alt={product.name}
                      />
                      <button
                        onClick={handleNextClick}
                        disabled={
                          state.currentImageIndex === product.images.length - 1
                        }
                      >
                        Next
                      </button>
                    </>
                  ) : (
                    <div>No image available</div>
                  )}
                </div>
              </div>
              <div className="Details p-7 sm:p-10 m-2 sm:w-1/2 sm:m-2 inline-grid justify-center items-center">
                <div className="detailsStock1">
                  <h2 className="text-2xl font-bold mt-2">{product.name}</h2>
                  <p>Product Id: {product._id}</p>
                </div>
                <div className="detailsStock1.1 flex items-center border-t-4 border-b-4 mt-2">
                  <ReactStars {...ratingOptions} />
                  {product && (
                    <span className="rev">
                      ({product.numOfReviews}) reviews
                    </span>
                  )}
                </div>
                <div className="detailsStock2">
                  <h1 className="text-4xl text-red-400 font-bold mt-2">
                    ₹{product.price}
                  </h1>
                </div>
                <div className="detailsStock3 flex items-center mt-2">
                  <div className="detailsStock3.1">
                    <button onClick={decriseQuantity} className="w-8 rounded-md bg-slate-500 text-white">
                      -
                    </button>
                    <input
                      className="w-8 rounded-md"
            value={quantity}
                      type="number"
                      readOnly
                    />
                    <button onClick={incriseQuantity} className="w-8 rounded-md bg-slate-500 text-white">
                      +
                    </button>
                  </div>
                  <button onClick={cartHandlerClick} className="bg-pink-400 rounded-lg mx-2 p-2 hover:bg-pink-500">
                    Add To Cart
                  </button>
                </div>
                <p className="flex font-bold border-t-4 border-b-4 p-1 text-2xl mt-2">
                  Status:{" "}
                  <span
                    className={product.stock < 1 ? "redColor" : "greenColor"}
                  >
                    {product.stock < 1 ? "OutOfStock" : "InStock"}
                  </span>
                </p>
                <div className="detailsStock4 text-2xl font-bold mt-2">
                  Description: <p className="text-sm">{product.description}</p>
                </div>
                <button className="bg-pink-400 rounded-lg mx-2 p-2 mt-2 hover:bg-pink-500">
                  Submit Review
                </button>
              </div>
            </div>
            <h2 className="text-center border-b-2">REVIEWS</h2>
            <div className="review flex overflow-auto">
              {product.reviews && product.reviews.length > 0 ? (
                <div className="mt-5 flex justify-center items-center space-x-4 p-4">
                  {product.reviews.map((review) => (
                    <Reviews key={review._id} review={review} />
                  ))}
                </div>
              ) : (
                <p className="text-center text-2xl m-10">No Reviews Yet</p>
              )}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default ProductDeatils2;
