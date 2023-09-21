import CheckOut from "./CheckOut";
import { useSelector,useDispatch} from "react-redux";
import Metadate from "../Metadate";
import { Fragment, useEffect } from "react";
import { clearError } from "../../actions/UserAction";
import { useNavigate } from "react-router-dom";
import {
  CardNumberElement,
  CardCvcElement,
  CardExpiryElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import axios from "axios";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import EventIcon from "@mui/icons-material/Event";
import VpnKeyIcon from "@mui/icons-material/VpnKey";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { createOrder } from "../../actions/OrderAction";

const Payment = () => {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
const dispatch=useDispatch();

  const { shippingInfo, cartItems } = useSelector((state) => state.cart);

  const { user } = useSelector((state) => state.user);

  const { error } = useSelector((state) => state.newOrder);

  const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"));

  const paymentData = {
    amount: Math.round(orderInfo.totalPrice * 100),
  };
  const baseURL = "http://localhost:4000/api/v1";

  const order={
    shippingInfo,
    orderItems:cartItems,
    itemsPrice:orderInfo.subTotal,
    taxPrice:orderInfo.tax,
    shippingPrice:orderInfo.shippingCharges,
totalPrice:orderInfo.totalPrice

  }

  const submitHandler = async (e) => {
    e.preventDefault();

    try {

      const config = {
        headers: {
          "Content-Type": "application/json",
         
        },
      };
      

      const { data } = await axios.post(
        `${baseURL}/payment/process`,
        paymentData,
        config
      );
     
      const client_secret = data.client_secret;

      if (!stripe || !elements) return;

      const result = await stripe.confirmCardPayment(client_secret, {
        payment_method: {
          card: elements.getElement(CardNumberElement),
          billing_details: {
            name: user.name,
            email:user.email,
            address: {
              line1: shippingInfo.address,
              city: shippingInfo.city,
              state: shippingInfo.state,
              country: shippingInfo.country,
              postal_code: shippingInfo.pinCode,
            },
          },
        },
      });

      if (result.error) {
        toast.error(result.error.message, {
          position: toast.POSITION.BOTTOM_CENTER,
        });
      } else {
        if (result.paymentIntent.status === "succeeded") {

          order.paymentInfo={
            id:result.paymentIntent.id,
            status:result.paymentIntent.status, 
          }
          dispatch(createOrder(order))
          navigate("/success");
        } else {
          toast.error("There Is Some Issue While Processing Payment", {
            position: toast.POSITION.BOTTOM_CENTER,
          });
        }
      }
    } catch (error) {
      toast.error(error.response.data.message, {
        position: toast.POSITION.BOTTOM_CENTER,
      });
    }
  };
  useEffect(() => {
    if (error) {
      toast.error(error, {
        position: toast.POSITION.BOTTOM_CENTER,
      });
      dispatch(clearError());
    }

  }, [dispatch, error]);

  return (
    <Fragment>
      <Metadate title="Payment" />

      <div className="bgD">
        <CheckOut activeSteps={2} />
        <div className="paymentContiner flex justify-center items-center max-w-full w-[100vw] h-[80vh]">
          <form
            className="PaymentFrom text-center lgBg p-8"
            onSubmit={(e) => submitHandler(e)}
          >
            <p className="text-xl font-semibold">Card Info</p>
            <div className="flex justify-center items-center">
              <CreditCardIcon />
              <CardNumberElement className="paymentInput p-5 w-48 m-4 bg-transparent rounded-md bt" />
            </div>
            <div className="flex justify-center items-center">
              <EventIcon />
              <CardExpiryElement className="paymentInput p-5 w-48 m-4 bg-transparent rounded-md bt" />
            </div>
            <div className="flex justify-center items-center">
              <VpnKeyIcon />
              <CardCvcElement className="paymentInput p-5 w-48 m-4 bg-transparent rounded-md bt" />
            </div>

            <input
              type="submit"
              className="px-16 rounded-md cursor-pointer font-bold hover:bg-green-500 bg-green-400 p-2"
              value={`Pay ${orderInfo ? orderInfo.totalPrice : 0}`}
            />
          </form>
        </div>
      </div>
      <ToastContainer />
    </Fragment>
  );
};

export default Payment;
