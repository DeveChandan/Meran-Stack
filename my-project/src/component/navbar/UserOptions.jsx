import { SpeedDial, SpeedDialAction } from "@mui/material";
import { Fragment, useState } from "react";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ListAltIcon from "@mui/icons-material/ListAlt";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import PersonIcon from "@mui/icons-material/Person";
import Backdrop from '@mui/material/Backdrop';
import { useNavigate } from "react-router-dom";
import { useDispatch ,useSelector } from "react-redux";
import { logout } from "../../actions/UserAction";
import accountP from '../../assets/header/account.png'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
const UserOptions = ({ user }) => {
  const { cartItems } = useSelector((state) => state.cart);
  const navigate = useNavigate();
  const dispatch = useDispatch();
 
  const [open, setOpen] = useState(false);

  const Dashboard = () => {
    navigate("/dashboard");
  };

  const orders = () => {
    navigate("/order");
  };

  const account = () => {
  
      navigate("/loginSingup");
    
  };
  const cart = () => {
    navigate("/cart");
  };

  const logoutUser = async () => {
    try {
      await dispatch(logout());

      toast.success("Logout successful", {
        position: toast.POSITION.BOTTOM_CENTER,
      });

      // After successful logout, you might want to navigate to loginSingup
      navigate("/loginSingup");
    } catch (error) {
      toast.error("Logout failed. Please try again later.", {
        position: toast.POSITION.BOTTOM_CENTER,
      });
    }
  };

  const options = [
    { icon: <ListAltIcon />, name: "Orders", func: orders },
    { icon: <ShoppingCartIcon />, name: `Cart${cartItems.length}`, func: cart },
    { icon: <ExitToAppIcon />, name: "Logout", func: logoutUser },
    { icon: <PersonIcon />, name: "Profile", func: account },
  ];

  if (user?.role === "admin") {
    options.unshift({
      icon: <DashboardIcon />,
      name: "Dashboard",
      func: Dashboard,
    });
  }

  // If the user object is not available or undefined, return null or show a loading state
  if (!user) {
    return null; // Or you can show a loading spinner or any other placeholder
  }

  return (
    <Fragment>
      <Backdrop open={open} style={{zIndex:20}}/>
      <SpeedDial
        ariaLabel="SpeedDail tooltip example"
        direction="down"
        className=" fixed right-1 top-24"
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        open={open}
        icon={
          <img
            className="speedDialIcon w-16 h-14 rounded-full  bg-transparent"
            src={user?.avatar?.url || accountP}
            alt="Profile"
          />
        }
      >
        {options.map((item) => (
          <SpeedDialAction
            key={item.name}
            icon={item.icon}
            tooltipTitle={item.name}
            onClick={item.func}
          />
        ))}
      </SpeedDial>
      <ToastContainer />
    </Fragment>
  );
};

export default UserOptions;

/*import { SpeedDial, SpeedDialAction } from "@mui/material";
import { Fragment, useState } from "react";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ListAltIcon from "@mui/icons-material/ListAlt";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import PersonIcon from "@mui/icons-material/Person";
import { useNavigate } from "react-router-dom";
import { logout } from "../../actions/UserAction";
import { useDispatch } from "react-redux";
import accountP from '../../assets/header/account.png'
import { ToastContainer, toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

const UserOptions = ({ user }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);

  function Dashboard() {
    navigate("/dashboard");
  }

  function orders() {
    navigate("/order");
  }

  function account() {
    navigate("/account");
  }

  function logoutUser() {
    dispatch(logout());
    toast.success('Success Notification !', {
      position: toast.POSITION.BOTTOM_CENTER
  });
  }

  const options = [
    { icon: <ListAltIcon />, name: "Orders", func: orders },
    { icon: <ExitToAppIcon />, name: "Logout", func: logoutUser },
    { icon: <PersonIcon />, name: "Profile", func: account },
  ];

  if (user?.role === "admin") {
    options.unshift({
      icon: <DashboardIcon />,
      name: "Dashboard",
      func: Dashboard,
    });
  }

  return (
    <Fragment>
      <SpeedDial
        ariaLabel="SpeedDail tooltip example"
        direction="down"
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        open={open}
        icon={
          <img
            className="speedDailIcon"
            src={user.avatar.url ? user.avatar.url : accountP}
            alt="Profile"
          />
        }
      >
        {options.map((item) => (
          <SpeedDialAction
          key={item.name}
            icon={item.icon} 
            tooltipTitle={item.name}
            onClick={item.func}
          />
        ))}
      </SpeedDial>
      <ToastContainer />
    </Fragment>
  );
};

export default UserOptions;*/