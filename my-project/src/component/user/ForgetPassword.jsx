import { EnvelopeOpenIcon } from "@heroicons/react/20/solid";
import { Fragment, useState, useEffect } from "react";
import "./LoginSingup.css";
import { useDispatch, useSelector } from "react-redux";
import { clearError, forgetPassword } from "../../actions/UserAction";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loader from "../loder/Loading";


const ForgetPassword = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const { error, message,loading } = useSelector((state) => state.forget);
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("email", email); 
    dispatch(forgetPassword(formData));
  };

  useEffect(() => {
    if (error) {
      console.error(error);
      dispatch(clearError());
    }
    if (message) {
      toast.success(message, {
        position: toast.POSITION.BOTTOM_CENTER,
      });
    }
  }, [dispatch, error, message,user]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <div className="bgD">
          <div className="loginSingupBox flex justify-center items-center max-w-full w-[100vw] h-[80vh]">
            <div className="updateBox flex-col lgBg justify-center items-center p-5">
              <h2 className="text-xl font-bold">Forgot Password</h2>
              <form onSubmit={handleSubmit}>
                <div className="sinupEmail flex">
                  <EnvelopeOpenIcon className="w-6" />
                  <input
                    type="email"
                    placeholder="Email"
                    className="p-3 m-4 bg-transparent rounded-md bt"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <input
                  type="submit"
                  value={loading ? "Updating..." : "SEND"}
                  className="w-[50%] p-2 shadow-xl rounded-lg hover:font-bold bg"
                  disabled={loading}
                />
              </form>
            </div>
          </div>
        </div>
      )}
      <ToastContainer />
    </Fragment>
  );
};

export default ForgetPassword;
