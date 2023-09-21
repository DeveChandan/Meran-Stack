import { Fragment, useEffect } from "react";
import Metadate from "../Metadate";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux/es/hooks/useSelector";
import Loading from "../loder/loading";
import "../product/produtDetails.css";

const Profile = () => {
  const navigate = useNavigate();
  const { user, loading, isAuthenticatedUser } = useSelector(
    (state) => state.user
  );

  useEffect(() => {
    if (isAuthenticatedUser === false) {
      navigate("/loginSingup");
    }
  }, [navigate, isAuthenticatedUser]);

  return (
    <Fragment>
      {loading ? (
        <Loading />
      ) : (
        <Fragment>
          <Metadate title={`${user?.name} Profile`} />
          <div className="bgD ">
            <div className="Pcontiner Details m-5 ">
              <div className=" text-center flex-col justify-center items-center ">
                <h1 className="text-xl font-bold text-slate-700">My Profile</h1>
                <div className="img flex justify-center items-center ">
                  <div className="rounded-full w-56 h-56 dH flex justify-center items-center bg-sky-300">
                    <div className="rounded-full w-48 h-48 d2H flex justify-center items-center bg-sky-200">
                      <img
                        src={user?.avatar?.url}
                        alt={user?.name}
                        className="w-40 h-40 rounded-full imH"
                      />
                    </div>
                  </div>
                </div>
                <Link
                  to="/me/update"
                  className="px-5 py-1 rounded-md bg-pink-400 text-white"
                >
                  Edit Profile{" "}
                </Link>
              </div>
              <div className="p-8">
                <div>
                  <h4 className="text-xl font-bold ">Full Name</h4>
                  <p>{user?.name}</p>
                </div>
                <div>
                  <h4 className="text-xl font-bold ">Email Name</h4>
                  <p>{user?.email}</p>
                </div>
                <div>
                  <h4 className="text-xl font-bold ">Joined Date</h4>
                  <p>{user?.createdAt ? String(user.createdAt) : "N/A"}</p>
                </div>
                <div className="text-center">
                  <div className="bg-lime-200 px-10 rounded-md m-3 py-1">
                    <Link className="" to="/order">
                      My Order
                    </Link>
                  </div>
                  <div className="bg-sky-400 px-10 rounded-md m-3 py-1">
                    <Link className="" to="/password/update">
                      Change Password
                    </Link>
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

export default Profile;
