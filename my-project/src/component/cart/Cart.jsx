import { Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";
import CartItem from "./CartItem";
import { addToCartItem, removeFormCart } from "../../actions/CartAction";
import "./cart2.css";
import RemoveShoppingCartIcon from "@mui/icons-material/RemoveShoppingCart";
import { Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { cartItems } = useSelector((state) => state.cart);
  const incriseQuantity = (id, stock, quantity) => {
    const newQty = quantity + 1;
    if (stock <= quantity) {
      return;
    }
    dispatch(addToCartItem(id, newQty));
  };

  const decriseQuantity = (id, quantity) => {
    const newQty = quantity - 1;
    if (1 >= quantity) {
      return;
    }
    dispatch(addToCartItem(id, newQty));
  };
  const deleteCartItem = (id) => {
    dispatch(removeFormCart(id));
  };
  const checkoutHandler=()=>{
    navigate('/loginSingup?redirect=shipping')

  }
  return (
    <Fragment>
      {cartItems.length === 0 ? (
        <div className="cartX m-auto flex text-center justify-center items-center flex-col h-[60vh]">
          <RemoveShoppingCartIcon />
          <Typography> No Product in Your Cart</Typography>
          <Link
            to="/products"
            className="bg-pink-600 text-white rounded-md p-2 mt-5 hover:bg-pink-400"
          >
            View Products
          </Link>
        </div>
      ) : (
        <Fragment>
          <div className="bgD">
            <div className="page">
              <div className="Details bg-sky-400">
                <div className="continer">
                  <p>Product</p>
                  <p>Quantity</p>
                  <p>SubTotal</p>
                </div>
                {cartItems &&
                  cartItems.map((item) => (
                    <div key={item.product} className="cartContainer">
                      <CartItem item={item} deleteCartItem={deleteCartItem} />
                      <div className="cartInput">
                        <button
                          onClick={() => {
                            decriseQuantity(
                              item.product, // Pass the product ID as the first parameter
                              item.quantity // Pass the current quantity as the third parameter
                            );
                          }}
                        >
                          -
                        </button>
                        <input type="number" value={item.quantity} readOnly />
                        <button
                          onClick={() => {
                            incriseQuantity(
                              item.product, // Pass the product ID as the first parameter
                              item.stock, // Pass the stock as the second parameter
                              item.quantity // Pass the current quantity as the third parameter
                            );
                          }}
                        >
                          +
                        </button>
                      </div>
                      <p className="subtotal">{`₹${
                        item.price * item.quantity
                      }`}</p>
                    </div>
                  ))}

                <div className="grossBody">
                  <div></div>
                  <div className="grossBox">
                    <p>Gross Total</p>
                    <p className="text-xl">
                      {`₹${cartItems.reduce(
                        (acc, item) => acc + item.quantity * item.price ,0
                      )}`}
                    </p>
                  </div>
                  <div></div>
                  <div className="checkOut">
                    <button onClick={checkoutHandler}>Check Out</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Fragment>
      
      )}
    </Fragment>
  );
};

export default Cart;
