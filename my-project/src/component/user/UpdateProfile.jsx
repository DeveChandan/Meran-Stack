/*import { EnvelopeOpenIcon, FaceFrownIcon } from "@heroicons/react/20/solid";
import { Fragment, useState, useEffect } from "react";
import "./LoginSingup.css";
import { useDispatch, useSelector } from "react-redux";
import { clearError, loadUser, updateProfile } from "../../actions/UserAction";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loader from "../loder/Loading";
import { useNavigate } from "react-router-dom";
import { UPDATE_PROFILE_RESET } from "../../consants/UserConsant";

const UpdateProfile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);
  const { error, loading, isUpdated } = useSelector((state) => state.profile);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [avatar, setAvatar] = useState();
  const [avatarPreview, setAvatarPreview] = useState(
    "../../assets/header/account.png"
  );

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
      setName(e.target.value);
    }
  };

  const singupSubmit = (e) => {
    e.preventDefault();
    const myForm = new FormData();
    myForm.set("name", name);
    myForm.set("email", email);
    myForm.set("avatar", avatar);
    dispatch(updateProfile(myForm));
  };

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setAvatarPreview(user.avatar.url);
    }
    if (error) {
      console.error(error);
      dispatch(clearError());
    }
    if (isUpdated) {
      toast.success("Profile updated successfully", {
        position: toast.POSITION.BOTTOM_CENTER,
      });
      dispatch(loadUser());
      navigate("/account");
      dispatch({
        type: UPDATE_PROFILE_RESET,
      });
    }
  }, [dispatch, error, navigate, toast, user, isUpdated]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <div className="bgD">
            <div className="loginSingupBox flex justify-center items-center max-w-full w-[100vw] h-[80vh]">
           <div className="updateBox flex-col lgBg justify-center items-center p-5"> 
           <h2 className="text-xl font-bold">Update Profile</h2>
           <form
                action=""
                onSubmit={singupSubmit}
                encType="multipart/form-data"
              >
                <div className="singupForm flex">
                  <FaceFrownIcon className="w-6" />
                  <input
                    type="text"
                    placeholder="Name"
                    className="p-3 m-4 bg-transparent rounded-md border-white bt"
                    required
                    name="name"
                    value={name}
                    onChange={(e)=>setName(e.target.value)}
                  />
                </div>
                <div className="sinupEmail flex">
                  <EnvelopeOpenIcon className="w-6" />
                  <input
                    type="email"
                    placeholder="Email"
                    className="p-3 m-4 bg-transparent rounded-md bt"
                    required
                    value={email}
                    onChange={(e) => setEmail( e.target.value )}
                  />
                </div>
            
                <div id="singupImage" className="flex flex-col justify-center items-center">
                  <img src={avatarPreview} alt="Preview" className="w-6 rounded-full" />
                  <input type="file" className="p-2 w-[80%]" name="avatar" accept="image/*" onChange={singupDataChange} />
                </div>
                <input
                  type="submit"
                  value="UPDATE"
                  className="w-[50%] p-2 shadow-xl rounded-lg hover:font-bold bg"
                  disabled={false}
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

export default UpdateProfile;
*/
import { EnvelopeOpenIcon, FaceFrownIcon } from "@heroicons/react/20/solid";
import { Fragment, useState, useEffect } from "react";
import "./LoginSingup.css";
import { useDispatch, useSelector } from "react-redux";
import { clearError, loadUser, updateProfile } from "../../actions/UserAction";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loader from "../loder/Loading";
import { useNavigate } from "react-router-dom";

const UpdateProfileForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);
  const { error, loading, isUpdated } = useSelector((state) => state.profile);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [avatar, setAvatar] = useState();
  const [avatarPreview, setAvatarPreview] = useState(
    "../../assets/header/account.png"
  );

  const handleChange = (e) => {
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
      setName(e.target.value);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("avatar", avatar);
    dispatch(updateProfile(formData));
  };

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setAvatarPreview(user.avatar.url);
    }
    if (error) {
      console.error(error);
      dispatch(clearError());
    }
    if (isUpdated) {
      toast.success("Profile updated successfully", {
        position: toast.POSITION.BOTTOM_CENTER,
      });
      dispatch(loadUser());
      navigate("/account");
    }
  }, [dispatch, error, navigate, user, isUpdated]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <div className="bgD">
          <div className="loginSingupBox flex justify-center items-center max-w-full w-[100vw] h-[80vh]">
            <div className="updateBox flex-col lgBg justify-center items-center p-5">
              <h2 className="text-xl font-bold">Update Profile</h2>
              <form
                action=""
                onSubmit={handleSubmit}
                encType="multipart/form-data"
              >
                <div className="singupForm flex">
                  <FaceFrownIcon className="w-6" />
                  <input
                    type="text"
                    placeholder="Name"
                    className="p-3 m-4 bg-transparent rounded-md border-white bt"
                    required
                    name="name"
                    value={name}
                    onChange={handleChange}
                  />
                </div>
                <div className="sinupEmail flex">
                  <EnvelopeOpenIcon className="w-6" />
                  <input
                    type="email"
                    placeholder="Email"
                    className="p-3 m-4 bg-transparent rounded-md bt"
                    required
                    value={email}
                    onChange={handleChange}
                  />
                </div>

                <div id="singupImage" className="flex flex-col justify-center items-center">
                  <img src={avatarPreview} alt="Preview" className="w-6 rounded-full" />
                  <input type="file" className="p-2 w-[80%]" name="avatar" accept="image/*" onChange={handleChange} />
                </div>
                <input
                  type="submit"
                  value={loading ? "Updating..." : "UPDATE"}
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

export default UpdateProfileForm;
