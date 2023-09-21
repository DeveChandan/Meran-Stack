import CheckOut from "./CheckOut";
import { useSelector } from "react-redux";
import Metadate from "../Metadate";
import { Fragment } from "react";
import { Typography } from "@mui/material";
import { Link } from "react-router-dom";
import './confrim.css'
import { useNavigate } from "react-router-dom";
const Confrim = () => {
  const navigate = useNavigate();
  const { shippingInfo, cartItems } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.user);

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.quantity * item.price,
    0
  );
  const shippingCharges = subtotal > 1000 ? 0 : 200;
  const tax = subtotal * 0.18;
  const totalPrice = subtotal + tax + shippingCharges;
  const address = `${shippingInfo.address} ${shippingInfo.city}${shippingInfo.state} ${shippingInfo.country} ${shippingInfo.pinCode}`;
  const proccedToPayment=()=>{
    const date={
      subtotal,
      tax,
      shippingCharges,
      totalPrice,
    }
    sessionStorage.setItem('orderInfo',JSON.stringify(date))
    navigate('/process/Payment')
  }
  return (
    <Fragment>
      <Metadate title="Conforim Order " />
      <div className="bgD">  
      <CheckOut activeSteps={1} />
      <div className=" sm:flex "> 
      <div className="shippingOrderPage  sm:w-2/3">
    
        <div className="ConfrimShippingAre flex flex-col justify-center items-center p-10 ">
          <Typography >Shipping Info</Typography>
          <div className="confrimShippingAreaBox Box p-2">
            <div className="flex justify-between p-2">
              <p className="text-xl font-bold">Name:</p>
              <span className=" font-semibold">{user.name}</span>
            </div>
            <div className="flex justify-between  p-2">
              <p className="text-xl font-bold ">Phone:</p>
              <span className=" font-semibold">{shippingInfo.phoneNo}</span>
            </div>
            <div  className="flex justify-between p-2">
              <p className="text-xl font-bold">Address:</p>
              <span className=" font-semibold">{address}</span>
            </div>
          </div>
        </div>

     
       
        <div className="confrimCartItemContiner p-1 overflow-hidden">
          <Typography>Your Cart Item:</Typography>
  {cartItems &&
    cartItems.map((item) => (
      <div className="flex justify-between Box items-center p-10 m-3 " key={item.product}>
        <img src={item.image} className="w-20" alt="Product" />
        <Link to={`/products/products${item.product}`}>{item.name}</Link>
        <span>
          {item.quantity} x ₹{item.price} = <b>₹{item.price * item.quantity}</b>
        </span>
      </div>
    ))}
</div>

       
</div>
      {/* */}
      <div className="OrderSummary  flex flex-col items-center justify-center  border-l-[1px]  sm:w-1/3    p-10">
        <Typography>Order Summary</Typography>
        <div className="p-5 Box">
          <div className="flex justify-between  p-4">
            <p className="text-xl font-bold">Subtotal:</p>
            <span className="text-lg font-semibold" >₹{subtotal}</span>
          </div>
          <div  className="flex justify-between p-4">
            <p className="text-xl font-bold">Shipping Charges:</p>
            <span className="text-lg font-semibold">₹{shippingCharges}</span>
          </div>
          <div  className="flex justify-between borderXL p-4">
            <p className="text-xl font-bold text-black">GST:</p>
            <span className="text-lg font-semibold text-black">₹{tax}</span>
          </div>
          <div  className="flex justify-between  p-4">
            <p className="text-xl font-bold">Total:</p>
            <span className="text-lg font-semibold">₹{totalPrice}</span>
          </div>
          <button onClick={proccedToPayment} className="bg-green-400 px-10 py-2 rounded-md m-2 hover:font-semibold">Proceed to Payment</button>
        </div>
      </div>
      </div>
      </div>
    </Fragment>
  );
};

export default Confrim;
