import { Fragment, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import PinDropIcon from "@mui/icons-material/PinDrop";
import HomeIcon from "@mui/icons-material/Home";
import LocationCityIcon from "@mui/icons-material/LocationCity";
import PublicIcon from "@mui/icons-material/Public";
import PhoneIcon from "@mui/icons-material/Phone";
import TransferWithinAStationIcon from "@mui/icons-material/TransferWithinAStation";
import Metadate from "../Metadate";
import { shippingInfo } from "../../actions/CartAction";
import { Country, State } from "country-state-city";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import CheckOut from "./CheckOut";
import { useNavigate } from "react-router-dom";
const Shipping = () => {
  const dispacth = useDispatch();
  const navigate = useNavigate();
  const { ShippingInfo } = useSelector((state) => state.cart);

  const [address, setAddress] = useState(shippingInfo.address);
  const [city, setCity] = useState(shippingInfo.city);
  const [state, setState] = useState(shippingInfo.state);
  const [country, setCountry] = useState(shippingInfo.country);
  const [pinCode, setPinCode] = useState(shippingInfo.pinCode);
  const [phoneNo, setPhoneNo] = useState(shippingInfo.phoneNO);
  const shippingSubmit = (e) => {
    e.preventDefault();
    if(phoneNo.length <10||phoneNo.length >10){
      toast.error('Phone number Should be 10 Digit', {
        position: toast.POSITION.BOTTOM_CENTER
      });
   return
    }
    dispacth(shippingInfo({address,city,state,country,pinCode,phoneNo}))
    navigate('/order/confirm');
  };
  return (
    <Fragment>
      <Metadate title="Shipping Details" />
     
      <div className="bgD">
     
        <div className="ShippingContiner ">
        <CheckOut activeSteps={0} />
          <div className="ShippingBox  flex flex-col justify-center items-center max-w-full w-[100vw] h-[80vh]">
        
            <h2 className=" text-3xl text-slate-400  m-5 border-b-4 ">
              Shipping Details
            </h2>
            <form
              encType="multipart/form-date"
              className="lgBg p-6"
              onSubmit={shippingSubmit}
            >
              <div>
                <HomeIcon />
                <input
                  type="text"
                  placeholder="Address"
                  required
               
                  className="p-3 m-1 bg-transparent rounded-md bt"
                  value={address}
                  onChange={(e) => {
                    setAddress(e.target.value);
                  }}
                />
              </div>
              <div>
                <LocationCityIcon />
                <input
                  type="text"
                  placeholder="City"
                  required
                  className="p-3 m-1 bg-transparent rounded-md bt"
                  value={city}
                  onChange={(e) => {
                    setCity(e.target.value);
                  }}
                />
              </div>

              <div>
                <PinDropIcon />
                <input
                  type="number"
                  placeholder="Pin Code"
                  required
                  className="p-3 m-1 bg-transparent rounded-md bt"
                  value={pinCode}
                  onChange={(e) => {
                    setPinCode(e.target.value);
                  }}
                />
              </div>
              <div>
                <PhoneIcon />
                <input
                  type="number"
                  placeholder="Phone no"
                  required
                  className="p-3 m-1 bg-transparent rounded-md bt"
                  value={phoneNo}
                  onChange={(e) => {
                    setPhoneNo(e.target.value);
                  }}
                />
              </div>

              <div>
                <PublicIcon />
                <select
                  required
                  className="p-3 m-1 bg-transparent w-52 rounded-md bt"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                >
                  <option value="">Country</option>
                  {Country &&
                    Country.getAllCountries().map((item) => (
                      <option key={item.isoCode} value={item.isoCode}>
                        {item.name}
                      </option>
                    ))}
                </select>
              </div>

              {country && (
                <div>
                  <TransferWithinAStationIcon />
                  <select
                    value={state}
                    required
                    className="p-3 m-1 bg-transparent w-52 rounded-md bt"
                    onChange={(e) => setState(e.target.value)}
                  >
                    <option value="">State</option>
                    {State &&
                      State.getStatesOfCountry(country).map((item) => (
                        <option key={item.isoCode} value={item.isoCode}>
                          {item.name}
                        </option>
                      ))}
                  </select>
                </div>
              )}
              <div className=" flex justify-center items-center">
                <input
                  type="submit"
                  value="Countinue"
                  className="ShppinpgInput m-1 bg-pink-500 rounded-md cursor-pointer px-10 py-2"
                  disabled={state ? false : true}
                />
              </div>
            </form>
          </div>
        </div>
      </div>
      <ToastContainer />
    </Fragment>
  );
};

export default Shipping;