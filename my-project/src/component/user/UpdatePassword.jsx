
import { LockClosedIcon,LockOpenIcon } from "@heroicons/react/20/solid";
import { Fragment, useState, useEffect } from "react";
import "./LoginSingup.css";
import { useDispatch, useSelector } from "react-redux";
import { clearError,  updatePassword } from "../../actions/UserAction";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loader from "../loder/Loading";
import { useNavigate } from "react-router-dom";
import { UPDATE_PASSWORD_RESET } from "../../consants/UserConsant";

const UpdatePassword = () => {
    const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);
  const { error, loading, isUpdated } = useSelector((state) => state.profile);
   const [oldPassword,setOldPassword]=useState('')
   const [newPassword,setNewPassword]=useState('')
   const [confirmPassword,setConfirmPassword]=useState('')




  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("oldPassword", oldPassword);
    formData.append("newPassword", newPassword);
    formData.append("confirmPassword", confirmPassword);
    dispatch(updatePassword(formData));
  };

  useEffect(() => {
 
    if (error) {
      console.error(error);
      dispatch(clearError());
    }
    if (isUpdated) {
      toast.success("Profile updated successfully", {
        position: toast.POSITION.BOTTOM_CENTER,
      });
  
      navigate("/account");
      dispatch({
        type:UPDATE_PASSWORD_RESET,
      })
    }
  }, [dispatch, error, navigate,  isUpdated]);
  return (
    <Fragment>
    {loading ? (
      <Loader />
    ) : (
      <div className="bgD">
        <div className="loginSingupBox flex justify-center items-center max-w-full w-[100vw] h-[80vh]">
          <div className="updateBox flex-col lgBg justify-center items-center p-5">
            <h2 className="text-xl font-bold">Update Password</h2>
            <form
              action=""
              onSubmit={handleSubmit}
              encType="multipart/form-data"
            >
          <div className="loginPassword flex">
                  <LockOpenIcon className="w-6" />
                  <input
                    type="password"
                    placeholder="Old Password"
                    required
                    className="p-3 m-4 bg-transparent rounded-md border-white bt"
                    value={oldPassword}
                    onChange={(e) => setOldPassword( e.target.value )}
                  />
                </div>
                <div className="loginPassword flex">
                  <LockClosedIcon className="w-6" />
                  <input
                    type="password"
                    placeholder="New Password"
                    required
                    className="p-3 m-4 bg-transparent rounded-md border-white bt"
                    value={newPassword}
                    onChange={(e) => setNewPassword( e.target.value )}
                  />
                </div>
                <div className="loginPassword flex">
                  <LockClosedIcon className="w-6" />
                  <input
                    type="password"
                    placeholder="Confirm Password"
                    required
                    className="p-3 m-4 bg-transparent rounded-md border-white bt"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value )}
                  />
                </div>
          
              <input
                type="submit"
                value={loading ? "Updating..." : "Change"}
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
  )
}

export default UpdatePassword
