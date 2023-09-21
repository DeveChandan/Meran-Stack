import { Link } from "react-router-dom";
import "./CartItem.css";
import { toast } from "react-toastify";

const CartItem = ({ item, deleteCartItem  }) => {
  return (
    <div className="CartItemCard">
      <img src={item.image} alt="devil" />
      <div>
        <Link to={`/products/products${item.product}`}> {item.name}</Link>
        <span>{`Price:${item.price}`}</span>
        <p
           onClick={() => {
            (deleteCartItem(item.product));
            toast.success(`Remove To Cart=${item.name}`, {
              position: toast.POSITION.BOTTOM_CENTER
            });
          }}
        >
          Remove
        </p>
      </div>
    </div>
  );
};

export default CartItem;
