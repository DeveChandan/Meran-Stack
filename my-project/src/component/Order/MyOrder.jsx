import Loading from "../loder/Loading";
import LaunchIcon from "@mui/icons-material/Launch";
import Metadate from "../Metadate";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { Fragment, useEffect } from "react";

import { clearError } from "../../actions/UserAction";

const MyOrder = () => {
  const dispatch = useDispatch();

  const { loading, error, orders } = useSelector((state) => state.myOrders);
  const { user } = useSelector((state) => state.user);

  const columns=[];
  const rows=[];

  useEffect(() => {
    if (error) {
      toast.error(error, {
        position: toast.POSITION.BOTTOM_CENTER,
      });
      dispatch(clearError());
    }
    dispatch(myOrders())
  }, [dispatch, toast, error]);

  return (
    <Fragment>
      <Metadate titile={`${user.name} Oders`} />
      {loading ? (
        <Loading />
      ) : (
        <div className="myOrderPage">
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={10}
            className="myOrderTable"
            autoHeight
          />
          <p id="myOderHeading">{user.name}Orders</p>
        </div>
      )}
    </Fragment>
  );
};

export default MyOrder;
