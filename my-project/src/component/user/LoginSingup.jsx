import {
  EnvelopeOpenIcon,
  FaceFrownIcon,
  LockClosedIcon,
  LockOpenIcon,
} from "@heroicons/react/20/solid";
import "./LoginSingup.css";
import { Link } from "react-router-dom";
import { useRef, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearError, login, register } from "../../actions/UserAction";
//import { ToastContainer, useToast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

import Loader from "../loder/Loading";
import { useNavigate } from "react-router-dom";
const LoginSingup = () => {
  const dispatch = useDispatch();
  //const toast=useToast();
  const navigate = useNavigate();
  const { error, loading, isAuthenticatedUser } = useSelector(
    (state) => state.user
  );
  const loginTab = useRef(null);
  const singupTab = useRef(null);
  const switcherTab = useRef(null);
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [user, setUser] = useState({
    name: "",
    password: "",
    email: "",
  });
  const { name, email, password } = user;
  const [avatar, setAvatar] = useState();
  const [avatarPreview, setAvatarPreview] = useState(
    "../../assets/header/account.png"
  );
  const [showSignupForm, setShowSignupForm] = useState(false); // State to manage the visibility of the signup form

  const singupDataChange = (e) => {
    if (e.target.name === "avatar") {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setAvatarPreview(reader.result);
          setAvatar(reader.result);
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    } else {
      setUser({ ...user, [e.target.name]: e.target.value });
    }
  };

  const loginSubmit = (e) => {
    e.preventDefault();
    dispatch(login(loginEmail, loginPassword));
  };

  const singupSubmit = (e) => {
    e.preventDefault();
    const myForm = new FormData();

    myForm.set("name", name);
    myForm.set("email", email);
    myForm.set("password", password);
    myForm.set("avatar", avatar);
    dispatch(register(myForm));
  };
  //toast.error(error);
  useEffect(() => {
    if (error) {
      dispatch(clearError());
    }
    if (isAuthenticatedUser) {
      navigate("/account");
    }
  }, [dispatch, error, navigate, isAuthenticatedUser]);
 
  const switchTabs = (e, tab) => {
    if (tab === "login") {
      switcherTab.current.classList.add("ShiftToNetural");
      switcherTab.current.classList.remove("ShiftToRight");
      singupTab.current.classList.remove("ShiftToNeturalForm2");
      loginTab.current.classList.remove("ShiftToLeft");
      setShowSignupForm(false); // Hide the signup form
    }
    if (tab === "signup") {
      switcherTab.current.classList.remove("ShiftToNetural");
      switcherTab.current.classList.add("ShiftToRight");
      singupTab.current.classList.add("ShiftToNeturalForm2");
      loginTab.current.classList.add("ShiftToLeft");
      setShowSignupForm(true); // Show the signup form
    }
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="bgD">
          <div className="loginSingupBox flex justify-center items-center max-w-full w-[100vw] h-[80vh]">
            <div
              className={`loginSingup lgBg border-2 w-80 h-[32rem] overflow-hidden ${
                showSignupForm ? "showSignupForm" : ""
              }`}
            >
              <div>
                <div className="loginSingupToggle  flex flex-row-reverse h-4 pt-6 px-12 pb-4">
                  <p
                    className={`cursor-pointer grid place-items-center hover:text-pink-600 font-bold $              {showSignupForm ? 'active' : ''}`}
                    onClick={(e) => switchTabs(e, "signup")}
                    ref={singupTab}
                  >
                    SIGNUP
                  </p>
                  <p
                    className={`cursor-pointer mr-28 grid place-items-center hover:text-pink-600 font-bold $              {!showSignupForm ? 'active' : ''}`}
                    onClick={(e) => switchTabs(e, "login")}
                    ref={loginTab}
                  >
                    LOGIN
                  </p>
                </div>
                <button
                  className="bg-green-600 h-1 w-[50%]"
                  ref={switcherTab}
                ></button>
              </div>
              setName(user.name)

            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default LoginSingup;
