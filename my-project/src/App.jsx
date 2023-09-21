import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useSelector,  } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

import Home from "./component/home/Home";
import Header from "./component/navbar/Header";
import About from "./component/about/About";
import "./index.css";
import "./component/home/home.css";

import ProductDetails from "./component/product/ProductDetils";
import AllProduct from "./component/product/AllProduct";
import Search from "./component/product/Search";

import Footer from "./component/footer/Footer";
import ProductDeatils2 from "./component/product/ProductDeatils2";
import LoginSingup from "./component/user/LoginSingup";

import { store } from "./Store";
import Cart from "./component/cart/cart";
import { loadUser } from "./actions/UserAction";

import UserOptions from "./component/navbar/UserOptions";
import Profile from "./component/user/Profile";
import UpdateProfile from "./component/user/UpdateProfile";
import UpdatePassword from "./component/user/UpdatePassword";
import ForgetPassword from "./component/user/ForgetPassword";

import Shipping from "./component/cart/Shipping";
import Confrim from "./component/cart/Confrim";
import Payment from "./component/cart/Payment";

import ProtectedRoute from "./component/Route/ProtectedRoute";
import { useEffect } from "react";



function App() {
  const { isAuthenticatedUser, user } = useSelector((state) => state.user);

  useEffect(() => {

    store.dispatch(loadUser());
  }, []); 
  const stripePromise =
    "pk_test_51NgJxPSBIcccHWH6hzx6RHjaIsMqQab3F2qfWtTZTdU1u8LmZHYeWE5ypBCDogG5bhBCgre951WuU4eIO4jkwJQi007pesKNIt";

  return (
    <BrowserRouter>
      <Header />
      {isAuthenticatedUser && <UserOptions user={user} />}
      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products/*" element={<AllProduct />} />
        <Route path="/products/:id" element={<ProductDetails />} />
        <Route path="/products/products/:id" element={<ProductDeatils2 />} />
        <Route path="/search" element={<Search />} />
        <Route path="/loginSingup" element={<LoginSingup />} />
        <Route
          element={<ProtectedRoute isAuthenticatedUser={isAuthenticatedUser} />}
        >
          <Route path="/cart" element={<Cart />} />
          <Route path="/account" element={<Profile />} />
        </Route>

        <Route path="/me/update" element={<UpdateProfile />} />
        <Route path="/password/update" element={<UpdatePassword />} />
        <Route path="/password/forgot" element={<ForgetPassword />} />
        <Route path="/loginSingup/shipping" element={<Shipping />} />
        <Route path="/order/confirm" element={<Confrim />} />
        {stripePromise && (
          <Route
            path="/process/payment"
            element={
              <Elements stripe={loadStripe(stripePromise)}>
                <Payment />
              </Elements>
            }
          />
        )}
        <Route path="/About" element={<About />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;

/*import Home from './component/home/Home';
import Header from './component/navbar/Header';
import About from './component/about/About'
import './index.css';
import './component/home/home.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ToastContainer, } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ProductDetails from './component/product/ProductDetils';
import AllProduct from './component/product/AllProduct';
import Search from './component/product/Search';
import Footer from './component/footer/Footer';
import ProductDeatils2 from './component/product/ProductDeatils2';
import LoginSingup from './component/user/LoginSingup';
import { store} from './Store';
import { useDispatch,Provider } from 'react-redux'
import { loadUser } from './actions/UserAction';
import { useEffect } from 'react';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch]);

  return (
    <Provider store={store}>
      {/* Wrap the entire app in the Provider and pass the store 
     <BrowserRouter>
        <Header />
        <ToastContainer
          position="bottom-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
        />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<AllProduct />} />
          <Route path="/products/:id" element={<ProductDetails />} />
          <Route path="/products/products/:id" element={<ProductDeatils2 />} />
          <Route path="/search" element={<Search />} />
          <Route path="/loginSingup" element={<LoginSingup />} />
          <Route path="/about" element={<About />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </Provider>
  );
}

export default App;
*/
